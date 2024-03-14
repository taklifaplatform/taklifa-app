import { StreamChat } from 'stream-chat';
import {
  ExtendableGenerics,
  DefaultGenerics,
  StreamChatOptions,
} from 'stream-chat/src/types';
import { StableWSConnection } from 'stream-chat/src/connection';
import { isErrorResponse, isWSFailure } from 'stream-chat/src/errors';
import { isOnline } from 'stream-chat/src/utils';
import { WSConnectionFallback } from 'stream-chat/src/connection_fallback';
import { ZixChatEcho } from './ZixChatEcho';

export class ZixChat<
  StreamChatGenerics extends ExtendableGenerics = DefaultGenerics,
> extends StreamChat {
  // private static _instance?: unknown | StreamChat; // type is undefined|StreamChat, unknown is due to TS limitations with statics

  public static getInstance<
    StreamChatGenerics extends ExtendableGenerics = DefaultGenerics,
  >(
    key: string,
    secretOrOptions?: StreamChatOptions | string,
    options?: StreamChatOptions,
  ): StreamChat<StreamChatGenerics> {
    if (!StreamChat._instance) {
      if (typeof secretOrOptions === 'string') {
        ZixChat._instance = new ZixChat<StreamChatGenerics>(
          key,
          secretOrOptions,
          options,
        );
      } else {
        ZixChat._instance = new ZixChat<StreamChatGenerics>(
          key,
          secretOrOptions,
        );
      }
    }

    return ZixChat._instance as StreamChat<StreamChatGenerics>;
  }

  /**
   * @private
   */
  async connect() {
    console.log('============');
    console.log('ZixChat::connect()');
    console.log('============');
    if (!this.userID || !this._user) {
      throw Error(
        'Call connectUser or connectAnonymousUser before starting the connection',
      );
    }
    if (!this.wsBaseURL) {
      throw Error('Websocket base url not set');
    }
    if (!this.clientID) {
      throw Error('clientID is not set');
    }

    if (
      !this.wsConnection &&
      (this.options.warmUp || this.options.enableInsights)
    ) {
      this._sayHi();
    }
    // The StableWSConnection handles all the reconnection logic.
    if (this.options.wsConnection && this.node) {
      // Intentionally avoiding adding ts generics on wsConnection in options since its only useful for unit test purpose.
      (
        this.options
          .wsConnection as unknown as StableWSConnection<StreamChatGenerics>
      ).setClient(this);
      this.wsConnection = this.options
        .wsConnection as unknown as StableWSConnection<StreamChatGenerics>;
    } else {
      this.wsConnection = new ZixChatEcho<StreamChatGenerics>({
        client: this,
      });
    }

    try {
      // if fallback is used before, continue using it instead of waiting for WS to fail
      if (this.wsFallback) {
        return await this.wsFallback.connect();
      }

      // if WSFallback is enabled, ws connect should timeout faster so fallback can try
      return await this.wsConnection.connect(
        this.options.enableWSFallback
          ? this.defaultWSTimeoutWithFallback
          : this.defaultWSTimeout,
      );
    } catch (err) {
      // run fallback only if it's WS/Network error and not a normal API error
      // make sure browser is online before even trying the longpoll
      if (this.options.enableWSFallback && isWSFailure(err) && isOnline()) {
        this.logger(
          'info',
          'client:connect() - WS failed, fallback to longpoll',
          { tags: ['connection', 'client'] },
        );
        this.dispatchEvent({ type: 'transport.changed', mode: 'longpoll' });

        this.wsConnection._destroyCurrentWSConnection();
        this.wsConnection.disconnect().then(); // close WS so no retry
        this.wsFallback = new WSConnectionFallback<StreamChatGenerics>({
          client: this,
        });
        return await this.wsFallback.connect();
      }

      throw err;
    }
  }
}
