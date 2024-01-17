import WebSocket from 'isomorphic-ws'
import { RealtimeChannel } from '@supabase/realtime-js'
import {
  buildWsFatalInsight,
  buildWsSuccessAfterFailureInsight,
  postInsights,
} from 'stream-chat/src/insights'
import {
  ConnectAPIResponse,
  ConnectionOpen,
  DefaultGenerics,
  ExtendableGenerics,
  LogLevel,
  UR,
} from 'stream-chat/src/types'
import {
  addConnectionEventListeners,
  chatCodes,
  convertErrorToJson,
  randomId,
  removeConnectionEventListeners,
  retryInterval,
  sleep,
} from 'stream-chat/src/utils'
import { ZixChat } from './ZixChat'

// Type guards to check WebSocket error type
const isCloseEvent = (
  res: WebSocket.CloseEvent | WebSocket.Data | WebSocket.ErrorEvent
): res is WebSocket.CloseEvent => (res as WebSocket.CloseEvent).code !== undefined

const isErrorEvent = (
  res: WebSocket.CloseEvent | WebSocket.Data | WebSocket.ErrorEvent
): res is WebSocket.ErrorEvent => (res as WebSocket.ErrorEvent).error !== undefined

/**
 * ZixStableWSConnection - A WS connection that reconnects upon failure.
 * - the browser will sometimes report that you're online or offline
 * - the WS connection can break and fail (there is a 30s health check)
 * - sometimes your WS connection will seem to work while the user is in fact offline
 * - to speed up online/offline detection you can use the window.addEventListener('offline');
 *
 * There are 4 ways in which a connection can become unhealthy:
 * - websocket.onerror is called
 * - websocket.onclose is called
 * - the health check fails and no event is received for ~40 seconds
 * - the browser indicates the connection is now offline
 *
 * There are 2 assumptions we make about the server:
 * - state can be recovered by querying the channel again
 * - if the servers fails to publish a message to the client, the WS connection is destroyed
 */
export class ZixStableWSConnection<ZixChatGenerics extends ExtendableGenerics = DefaultGenerics> {
  // global from constructor
  client: ZixChat<ZixChatGenerics>
  globalChannel: RealtimeChannel
  //

  // local vars
  connectionID?: string
  connectionOpen?: ConnectAPIResponse<ZixChatGenerics>
  consecutiveFailures: number
  pingInterval: number
  healthCheckTimeoutRef?: NodeJS.Timeout
  isConnecting: boolean
  isDisconnected: boolean
  isHealthy: boolean
  isResolved?: boolean
  lastEvent: Date | null
  connectionCheckTimeout: number
  connectionCheckTimeoutRef?: NodeJS.Timeout
  rejectPromise?: (
    reason?: Error & { code?: string | number; isWSFailure?: boolean; StatusCode?: string | number }
  ) => void
  requestID: string | undefined
  resolvePromise?: (value: ConnectionOpen<ZixChatGenerics>) => void
  totalFailures: number
  ws?: WebSocket
  wsID: number

  constructor({ client }: { client: ZixChat<ZixChatGenerics> }) {
    /** ZixChat client */
    this.client = client
    /** consecutive failures influence the duration of the timeout */
    this.consecutiveFailures = 0
    /** keep track of the total number of failures */
    this.totalFailures = 0
    /** We only make 1 attempt to reconnect at the same time.. */
    this.isConnecting = false
    /** To avoid reconnect if client is disconnected */
    this.isDisconnected = false
    /** Boolean that indicates if the connection promise is resolved */
    this.isResolved = false
    /** Boolean that indicates if we have a working connection to the server */
    this.isHealthy = false
    /** Incremented when a new WS connection is made */
    this.wsID = 1
    /** Store the last event time for health checks */
    this.lastEvent = null
    /** Send a health check message every 25 seconds */
    this.pingInterval = 25 * 1000
    this.connectionCheckTimeout = this.pingInterval + 10 * 1000

    addConnectionEventListeners(this.onlineStatusChanged)
  }

  _log(msg: string, extra: UR = {}, level: LogLevel = 'info') {
    this.client.logger(level, 'connection:' + msg, { tags: ['connection'], ...extra })
    console.log('=========')
    console.log('WS_log::', msg, extra, level)
    console.log('=========')
  }

  setClient(client: ZixChat<ZixChatGenerics>) {
    this.client = client
  }

  /**
   * connect - Connect to the WS URL
   * the default 15s timeout allows between 2~3 tries
   * @return {ConnectAPIResponse<ChannelType, CommandType, UserType>} Promise that completes once the first health check message is received
   */
  async connect(timeout = 15000) {
    if (this.isConnecting) {
      throw Error(`You've called connect twice, can only attempt 1 connection at the time`)
    }

    console.log('wes connect')

    this.isDisconnected = false

    try {
      this.globalChannel = this.client.supabase.channel('messaging', {
        config: {
          broadcast: { ack: true },
        },
      })
      this.globalChannel.on('broadcast', { event: '*' }, (event) => {
        this.client.dispatchEvent(event.payload)
        console.log('==================')
        console.log('event::', event)
        console.log('==================')
      })
      const healthCheck = await this._connect()
      this.consecutiveFailures = 0

      this._log(`connect() - Established ws connection with healthcheck: ${healthCheck}`)
    } catch (error) {
      this.isHealthy = false
      this.consecutiveFailures += 1

      if (error.code === chatCodes.TOKEN_EXPIRED) {
        this._log(
          'connect() - WS failure due to expired token, so going to try to reload token and reconnect'
        )
        this._reconnect({ refreshToken: true })
      } else if (!error.isWSFailure) {
        // API rejected the connection and we should not retry
        throw new Error(
          JSON.stringify({
            code: error.code,
            StatusCode: error.StatusCode,
            message: error.message,
            isWSFailure: error.isWSFailure,
          })
        )
      }
    }

    return await this._waitForHealthy(timeout)
  }

  /**
   * _waitForHealthy polls the promise connection to see if its resolved until it times out
   * the default 15s timeout allows between 2~3 tries
   * @param timeout duration(ms)
   */
  async _waitForHealthy(timeout = 15000) {
    return Promise.race([
      (async () => {
        const interval = 50 // ms
        for (let i = 0; i <= timeout; i += interval) {
          try {
            return await this.connectionOpen
          } catch (error) {
            if (i === timeout) {
              throw new Error(
                JSON.stringify({
                  code: error.code,
                  StatusCode: error.StatusCode,
                  message: error.message,
                  isWSFailure: error.isWSFailure,
                })
              )
            }
            await sleep(interval)
          }
        }
      })(),
      (async () => {
        await sleep(timeout)
        this.isConnecting = false
        throw new Error(
          JSON.stringify({
            code: '',
            StatusCode: '',
            message: 'initial WS connection could not be established',
            isWSFailure: true,
          })
        )
      })(),
    ])
  }

  /**
   * disconnect - Disconnect the connection and doesn't recover...
   *
   */
  async disconnect(timeout?: number) {
    console.log('==============')
    console.log('disconnect::', timeout)
    console.log('==============')
    this._log(`disconnect() - Closing the websocket connection for wsID ${this.wsID}`)
    this.isConnecting = false
    this.isDisconnected = true

    await this.client.supabase.removeChannel(this.globalChannel)
    this.isHealthy = false

    return true
  }

  /**
   * _connect - Connect to the WS endpoint
   *
   * @return {ConnectAPIResponse<ChannelType, CommandType, UserType>} Promise that completes once the first health check message is received
   */
  async _connect() {
    this.globalChannel.subscribe((status) => {
      console.log('status::', this.client.user?.name, status)

      this.isHealthy = status === 'SUBSCRIBED'

      if (status === 'CLOSED') {
        this.onclose(this.wsID)
      }

      this.client.dispatchEvent({ type: 'connection.changed', online: this.isHealthy })
      this.isConnecting = false
    })

    // if (this.isConnecting) return // simply ignore _connect if it's currently trying to connect
    // this.isConnecting = true
    // this.requestID = randomId()

    // try {
    //   this.globalChannel.subscribe((status) => {
    //     console.log('status::', this.client.user?.name, status)

    //     this.isHealthy = status === 'SUBSCRIBED'

    //     this.client.dispatchEvent({ type: 'connection.changed', online: this.isHealthy })
    //     this.isConnecting = false
    //   })
    //   return this.globalChannel
    // } catch (err) {
    //   this.isConnecting = false
    //   this.isHealthy = false
    //   console.log('ws_fatal::error::', err)
    //   throw err
    // }
    // return new Promise((resove, reject) => {

    // })
  }

  /**
   * _reconnect - Retry the connection to WS endpoint
   *
   * @param {{ interval?: number; refreshToken?: boolean }} options Following options are available
   *
   * - `interval`	{int}			number of ms that function should wait before reconnecting
   * - `refreshToken` {boolean}	reload/refresh user token be refreshed before attempting reconnection.
   */
  async _reconnect(options: { interval?: number; refreshToken?: boolean } = {}): Promise<void> {
    this._log('_reconnect() - Initiating the reconnect')

    // only allow 1 connection at the time
    if (this.isConnecting || this.isHealthy) {
      this._log('_reconnect() - Abort (1) since already connecting or healthy')
      return
    }

    // reconnect in case of on error or on close
    // also reconnect if the health check cycle fails
    let interval = options.interval
    if (!interval) {
      interval = retryInterval(this.consecutiveFailures)
    }
    // reconnect, or try again after a little while...
    await sleep(interval)

    // Check once again if by some other call to _reconnect is active or connection is
    // already restored, then no need to proceed.
    if (this.isConnecting || this.isHealthy) {
      this._log('_reconnect() - Abort (2) since already connecting or healthy')
      return
    }

    if (this.isDisconnected && this.client.options.enableWSFallback) {
      this._log('_reconnect() - Abort (3) since disconnect() is called')
      return
    }

    this._log('_reconnect() - Destroying current WS connection')

    // cleanup the old connection
    this._destroyCurrentWSConnection()

    try {
      await this._connect()
      this._log('_reconnect() - Waiting for recoverCallBack')
      await this.client.recoverState()
      this._log('_reconnect() - Finished recoverCallBack')

      this.consecutiveFailures = 0
    } catch (error) {
      this.isHealthy = false
      this.consecutiveFailures += 1
      if (error.code === chatCodes.TOKEN_EXPIRED) {
        this._log(
          '_reconnect() - WS failure due to expired token, so going to try to reload token and reconnect'
        )

        return this._reconnect({ refreshToken: true })
      }

      // reconnect on WS failures, don't reconnect if there is a code bug
      if (error.isWSFailure) {
        this._log('_reconnect() - WS failure, so going to try to reconnect')

        this._reconnect()
      }
    }
    this._log('_reconnect() - == END ==')
  }

  /**
   * onlineStatusChanged - this function is called when the browser connects or disconnects from the internet.
   *
   * @param {Event} event Event with type online or offline
   *
   */
  onlineStatusChanged = (event: Event) => {
    if (event.type === 'offline') {
      // mark the connection as down
      this._log('onlineStatusChanged() - Status changing to offline')
      this._setHealth(false)
    } else if (event.type === 'online') {
      // retry right now...
      // We check this.isHealthy, not sure if it's always
      // smart to create a new WS connection if the old one is still up and running.
      // it's possible we didn't miss any messages, so this process is just expensive and not needed.
      this._log(`onlineStatusChanged() - Status changing to online. isHealthy: ${this.isHealthy}`)
      if (!this.isHealthy) {
        this._reconnect({ interval: 10 })
      }
    }
  }

  onopen = (wsID: number) => {
    if (this.wsID !== wsID) return

    this._log('onopen() - onopen callback', { wsID })
  }

  onmessage = (wsID: number, event: WebSocket.MessageEvent) => {
    if (this.wsID !== wsID) return

    this._log('onmessage() - onmessage callback', { event, wsID })
    const data = typeof event.data === 'string' ? JSON.parse(event.data) : null

    // we wait till the first message before we consider the connection open..
    // the reason for this is that auth errors and similar errors trigger a ws.onopen and immediately
    // after that a ws.onclose..
    if (!this.isResolved && data) {
      this.isResolved = true
      if (data.error) {
        this.rejectPromise?.(this._errorFromWSEvent(data, false))
        return
      }

      this.resolvePromise?.(data)
      this._setHealth(true)
    }

    // trigger the event..
    this.lastEvent = new Date()

    if (data && data.type === 'health.check') {
      this.scheduleNextPing()
    }

    this.client.handleEvent(event)
    this.scheduleConnectionCheck()
  }

  onclose = (wsID: number) => {
    if (this.wsID !== wsID) return
    const event = {}

    this._log('onclose() - onclose callback - ', { wsID })

    if (this.isDisconnected) {
      // this is a permanent error raised by stream..
      // usually caused by invalid auth details
      const error = new Error(`WS connection reject with error disconnected`) as Error &
        WebSocket.CloseEvent

      this.rejectPromise?.(error)
      this._log(`onclose() - WS connection reject with error disconnected`, { wsID })
    } else {
      this.consecutiveFailures += 1
      this.totalFailures += 1
      this._setHealth(false)
      this.isConnecting = false

      this.rejectPromise?.(this._errorFromWSEvent(event))

      this._log(`onclose() - WS connection closed. Calling reconnect ...`, { event })

      // reconnect if its an abnormal failure
      this._reconnect()
    }
  }

  onerror = (wsID: number, event: WebSocket.ErrorEvent) => {
    if (this.wsID !== wsID) return

    this.consecutiveFailures += 1
    this.totalFailures += 1
    this._setHealth(false)
    this.isConnecting = false

    this.rejectPromise?.(this._errorFromWSEvent(event))
    this._log(`onerror() - WS connection resulted into error`, { event })

    this._reconnect()
  }

  /**
   * _setHealth - Sets the connection to healthy or unhealthy.
   * Broadcasts an event in case the connection status changed.
   *
   * @param {boolean} healthy boolean indicating if the connection is healthy or not
   *
   */
  _setHealth = (healthy: boolean) => {
    if (healthy === this.isHealthy) return

    this.isHealthy = healthy

    if (this.isHealthy) {
      this.client.dispatchEvent({ type: 'connection.changed', online: this.isHealthy })
      return
    }

    // we're offline, wait few seconds and fire and event if still offline
    setTimeout(() => {
      if (this.isHealthy) return
      this.client.dispatchEvent({ type: 'connection.changed', online: this.isHealthy })
    }, 5000)
  }

  /**
   * _errorFromWSEvent - Creates an error object for the WS event
   *
   */
  _errorFromWSEvent = (
    event: WebSocket.CloseEvent | WebSocket.Data | WebSocket.ErrorEvent,
    isWSFailure = true
  ) => {
    let code
    let statusCode
    let message
    if (isCloseEvent(event)) {
      code = event.code
      statusCode = 'unknown'
      message = event.reason
    }

    if (isErrorEvent(event)) {
      code = event.error.code
      statusCode = event.error.StatusCode
      message = event.error.message
    }

    // Keeping this `warn` level log, to avoid cluttering of error logs from ws failures.
    this._log(`_errorFromWSEvent() - WS failed with code ${code}`, { event }, 'warn')

    const error = new Error(`WS failed with code ${code} and reason - ${message}`) as Error & {
      code?: string | number
      isWSFailure?: boolean
      StatusCode?: string | number
    }
    error.code = code
    /**
     * StatusCode does not exist on any event types but has been left
     * as is to preserve JS functionality during the TS implementation
     */
    error.StatusCode = statusCode
    error.isWSFailure = isWSFailure
    return error
  }

  /**
   * _destroyCurrentWSConnection - Removes the current WS connection
   *
   */
  _destroyCurrentWSConnection() {
    // increment the ID, meaning we will ignore all messages from the old
    // ws connection from now on.
    this.wsID += 1

    try {
      this.client.supabase.removeChannel(this.globalChannel)
    } catch (e) {
      // we don't care
    }
  }

  /**
   * _setupPromise - sets up the this.connectOpen promise
   */
  _setupConnectionPromise = () => {
    this.isResolved = false
    /** a promise that is resolved once ws.open is called */
    this.connectionOpen = new Promise<ConnectionOpen<ZixChatGenerics>>((resolve, reject) => {
      this.resolvePromise = resolve
      this.rejectPromise = reject
    })
  }

  /**
   * Schedules a next health check ping for websocket.
   */
  scheduleNextPing = () => {
    if (this.healthCheckTimeoutRef) {
      clearTimeout(this.healthCheckTimeoutRef)
    }

    // 30 seconds is the recommended interval (messenger uses this)
    this.healthCheckTimeoutRef = setTimeout(() => {
      // send the healthcheck.., server replies with a health check event
      const data = [{ type: 'health.check', client_id: this.client.clientID }]
      // try to send on the connection
      try {
        this.ws?.send(JSON.stringify(data))
      } catch (e) {
        // error will already be detected elsewhere
      }
    }, this.pingInterval)
  }

  /**
   * scheduleConnectionCheck - schedules a check for time difference between last received event and now.
   * If the difference is more than 35 seconds, it means our health check logic has failed and websocket needs
   * to be reconnected.
   */
  scheduleConnectionCheck = () => {
    if (this.connectionCheckTimeoutRef) {
      clearTimeout(this.connectionCheckTimeoutRef)
    }

    this.connectionCheckTimeoutRef = setTimeout(() => {
      const now = new Date()
      if (
        this.lastEvent &&
        now.getTime() - this.lastEvent.getTime() > this.connectionCheckTimeout
      ) {
        this._log('scheduleConnectionCheck - going to reconnect')
        this._setHealth(false)
        this._reconnect()
      }
    }, this.connectionCheckTimeout)
  }
}
