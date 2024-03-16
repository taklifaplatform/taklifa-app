import { StableWSConnection } from 'stream-chat';
import {
  buildWsFatalInsight,
  buildWsSuccessAfterFailureInsight,
  postInsights,
} from 'stream-chat/src/insights';
import {
  convertErrorToJson,
  randomId
} from 'stream-chat/src/utils';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { DefaultGenerics, ExtendableGenerics } from 'stream-chat/src/types';
import { OpenAPI } from '@zix/api';

global.Pusher = Pusher;

export class ZixChatEcho<
  StreamChatGenerics extends ExtendableGenerics = DefaultGenerics,
> extends StableWSConnection {
  /**
   * _connect - Connect to the WS endpoint
   *
   * @return {ConnectAPIResponse<ChannelType, CommandType, UserType>} Promise that completes once the first health check message is received
   */
  async _connect() {
    if (
      this.isConnecting ||
      (this.isDisconnected && this.client.options.enableWSFallback)
    )
      return; // simply ignore _connect if it's currently trying to connect
    this.isConnecting = true;
    this.requestID = randomId();
    this.client.insightMetrics.connectionStartTimestamp = new Date().getTime();
    let isTokenReady = false;
    try {
      this._log(`_connect() - waiting for token`);
      await this.client.tokenManager.tokenReady();
      isTokenReady = true;
    } catch (e) {
      // token provider has failed before, so try again
    }

    try {
      if (!isTokenReady) {
        this._log(
          `_connect() - tokenProvider failed before, so going to retry`,
        );
        await this.client.tokenManager.loadToken();
      }

      this._setupConnectionPromise();
      const wsURL = this._buildUrl();
      this._log(`_connect() - Connecting to ${wsURL}`, {
        wsURL,
        requestID: this.requestID,
      });

      const echo = new Echo({
        broadcaster: 'reverb',
        key: 'connect',
        wsHost: `${process.env.NEXT_PUBLIC_WS_URL}`,
        wsPort: 8080,
        wssPort: 443,
        forceTLS: false,
        enabledTransports: ['ws'],
        // enabledTransports: ['ws', 'wss'],
      });

      this.resolvePromise?.({ type: 'success' });
      this._setHealth(true);
      // echo.join("chat")
      //   .here((users) => {
      //     console.log("ChatUsers::", users);
      //   })
      //   .joining((user) => {
      //     console.log("ChatUserJoining::", user);
      //   })
      //   .leaving((user) => {
      //     console.log("ChatUserLeaving::", user);
      //   });
      // echo.on
      echo.channel('chat').listen('.message', (echoEvent: any) => {
        console.log('ChatMessage v2ab-::', echoEvent);
        this.client.handleEvent({
          data: JSON.stringify(echoEvent),
        } as any);
      });
      this.ws = echo;
      // this.ws = new WebSocket(wsURL);
      // this.ws.onopen = this.onopen.bind(this, this.wsID);
      // this.ws.onclose = this.onclose.bind(this, this.wsID);
      // this.ws.onerror = this.onerror.bind(this, this.wsID);
      // this.ws.onmessage = this.onmessage.bind(this, this.wsID);
      // const response = await this.connectionOpen;
      this.isConnecting = false;

      if (echo) {
        this.connectionID = echo.socketId();
        if (
          this.client.insightMetrics.wsConsecutiveFailures > 0 &&
          this.client.options.enableInsights
        ) {
          postInsights(
            'ws_success_after_failure',
            buildWsSuccessAfterFailureInsight(
              this as unknown as StableWSConnection,
            ),
          );
          this.client.insightMetrics.wsConsecutiveFailures = 0;
        }
        return echo;
      }
    } catch (err) {
      this.isConnecting = false;
      this._log(`_connect() - Error - `, err);
      if (this.client.options.enableInsights) {
        this.client.insightMetrics.wsConsecutiveFailures++;
        this.client.insightMetrics.wsTotalFailures++;

        const insights = buildWsFatalInsight(
          this as unknown as StableWSConnection,
          convertErrorToJson(err as Error),
        );
        postInsights?.('ws_fatal', insights);
      }
      throw err;
    }
  }
}
