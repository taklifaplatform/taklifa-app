import { DefaultGenerics, ExtendableGenerics } from "stream-chat/src/types";
import { addConnectionEventListeners, sleep } from "stream-chat/src/utils";
import { ZixChat } from "./ZixChat";
import { RealtimeChannel } from "@supabase/supabase-js";

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
export class ZixStableWSConnection<
  ZixChatGenerics extends ExtendableGenerics = DefaultGenerics,
> {
  // global from constructor
  client: ZixChat<ZixChatGenerics>;
  globalChannel?: RealtimeChannel;
  //

  // local vars
  connectionID?: string;
  connectionOpen?: any; //ConnectAPIResponse<ZixChatGenerics>;
  consecutiveFailures: number;
  pingInterval: number;
  healthCheckTimeoutRef?: NodeJS.Timeout;
  isConnecting: boolean;
  isDisconnected: boolean;
  isHealthy: boolean;
  isResolved?: boolean;
  lastEvent: Date | null;
  connectionCheckTimeout: number;
  connectionCheckTimeoutRef?: NodeJS.Timeout;
  rejectPromise?: (
    reason?: Error & {
      code?: string | number;
      isWSFailure?: boolean;
      StatusCode?: string | number;
    },
  ) => void;
  requestID: string | undefined;
  resolvePromise?: (value: any) => void;
  // resolvePromise?: (value: ConnectionOpen<ZixChatGenerics>) => void;
  totalFailures: number;
  ws?: any;
  wsID: number;

  constructor({ client }: { client: any }) {
    // constructor({ client }: { client: ZixChat<ZixChatGenerics> }) {
    /** ZixChat client */
    this.client = client;
    /** consecutive failures influence the duration of the timeout */
    this.consecutiveFailures = 0;
    /** keep track of the total number of failures */
    this.totalFailures = 0;
    /** We only make 1 attempt to reconnect at the same time.. */
    this.isConnecting = false;
    /** To avoid reconnect if client is disconnected */
    this.isDisconnected = false;
    /** Boolean that indicates if the connection promise is resolved */
    this.isResolved = false;
    /** Boolean that indicates if we have a working connection to the server */
    this.isHealthy = false;
    /** Incremented when a new WS connection is made */
    this.wsID = 1;
    /** Store the last event time for health checks */
    this.lastEvent = null;
    /** Send a health check message every 25 seconds */
    this.pingInterval = 25 * 1000;
    this.connectionCheckTimeout = this.pingInterval + 10 * 1000;

    addConnectionEventListeners(this.onlineStatusChanged);
  }

  _log(msg: string, extra = {}, level = "info") {
    // _log(msg: string, extra: UR = {}, level: LogLevel = "info") {
    this.client.logger(level, "connection:" + msg, {
      tags: ["connection"],
      ...extra,
    });
    console.log("=========");
    console.log("WS_log::", msg, extra, level);
    console.log("=========");
  }

  /**
   * connect - Connect to the WS URL
   * the default 15s timeout allows between 2~3 tries
   * @return {ConnectAPIResponse<ChannelType, CommandType, UserType>} Promise that completes once the first health check message is received
   */
  async connect(timeout = 15000) {
    if (this.isConnecting) {
      throw Error(
        `You've called connect twice, can only attempt 1 connection at the time`,
      );
    }

    console.log("wes connect");

    this.isDisconnected = false;
    this.isConnecting = true;

    try {
      this.globalChannel = this.client.supabase.realtime.channel("messaging", {
        config: {
          broadcast: { ack: true, self: false },
        },
      });
      // this.globalChannel
      //   .on('presence', { event: 'sync' }, () => {
      //     const newState = this.globalChannel.presenceState()
      //     console.log('PRESENCE:: sync', newState)
      //   })
      //   .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      //     console.log('PRESENCE::join', key, newPresences)
      //   })
      //   .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      //     console.log('PRESENCE::leave', key, leftPresences)
      //   })

      this.globalChannel.on("broadcast", { event: "*" }, (event) => {
        this.client.dispatchEvent(event.payload);
        console.log("==================");
        console.log("event::", event);
        console.log("==================");
      });
      this.globalChannel.subscribe(async (status) => {
        console.log("status::", this.client.user?.name, status);

        if (status === "CLOSED") {
          return;
        }

        this.isHealthy = status === "SUBSCRIBED";

        this.client.dispatchEvent({
          type: "connection.changed",
          online: this.isHealthy,
        });
        this.isConnecting = false;

        // if (this.client.user) {
        //   const presenceTrackStatus = await this.globalChannel.track(this.client.user)
        //   console.log('presenceTrackStatus::', presenceTrackStatus)
        // }
      }, timeout);

      // this.globalChannel.rejoinTimer()
      this.consecutiveFailures = 0;

      this._log(`connect() - Established ws connection with healthcheck: `);
    } catch (error) {
      this.isHealthy = false;
      this.consecutiveFailures += 1;

      throw new Error(
        JSON.stringify({
          code: error.code,
          StatusCode: error.StatusCode,
          message: error.message,
          isWSFailure: error.isWSFailure,
        }),
      );
    }

    return await this._waitForHealthy(timeout);
  }

  async onChannelSubscriptionClosed() {
    this._log("Connection closed by server, going to reconnect");
    if (!this.isDisconnected && !this.isConnecting) {
      await this.client.supabase.realtime.removeChannel(this.globalChannel);
      await this.connect();
    }
  }

  /**
   * _waitForHealthy polls the promise connection to see if its resolved until it times out
   * the default 15s timeout allows between 2~3 tries
   * @param timeout duration(ms)
   */
  async _waitForHealthy(timeout = 15000) {
    return Promise.race([
      (async () => {
        const interval = 50; // ms
        for (let i = 0; i <= timeout; i += interval) {
          try {
            return await this.connectionOpen;
          } catch (error) {
            if (i === timeout) {
              throw new Error(
                JSON.stringify({
                  code: error.code,
                  StatusCode: error.StatusCode,
                  message: error.message,
                  isWSFailure: error.isWSFailure,
                }),
              );
            }
            await sleep(interval);
          }
        }
      })(),
      (async () => {
        await sleep(timeout);
        this.isConnecting = false;
        throw new Error(
          JSON.stringify({
            code: "",
            StatusCode: "",
            message: "initial WS connection could not be established",
            isWSFailure: true,
          }),
        );
      })(),
    ]);
  }

  /**
   * onlineStatusChanged - this function is called when the browser connects or disconnects from the internet.
   *
   * @param {Event} event Event with type online or offline
   */
  onlineStatusChanged = (event: Event) => {
    console.log("==============");
    console.log("onlineStatusChanged::", event);
    console.log("==============");
    // if (event.type === 'offline') {
    //   // mark the connection as down
    //   this._log('onlineStatusChanged() - Status changing to offline')
    //   this._setHealth(false)
    // } else if (event.type === 'online') {
    //   // retry right now...
    //   // We check this.isHealthy, not sure if it's always
    //   // smart to create a new WS connection if the old one is still up and running.
    //   // it's possible we didn't miss any messages, so this process is just expensive and not needed.
    //   this._log(`onlineStatusChanged() - Status changing to online. isHealthy: ${this.isHealthy}`)
    //   if (!this.isHealthy) {
    //     this._reconnect({ interval: 10 })
    //   }
    // }
  };
}
