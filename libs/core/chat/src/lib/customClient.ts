import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@zix/core/supabase";
import { Channel, ClientState } from "stream-chat";
import {
  ChannelData,
  ChannelMute,
  ChannelResponse,
  Configs,
  ConnectAPIResponse,
  Event,
  EventHandler,
  ExtendableGenerics,
  Mute,
  OwnUserResponse,
  StreamChatOptions,
  UserResponse,
} from "stream-chat/src/types";
import { addFileToFormData } from "stream-chat/src/utils";
import { MessageStatusTypes } from "../utils/utils";
import { fakeChannelObject } from "./sdk/fakeChannelObject";

export class CustomClient {
  supabase: SupabaseClient<Database>;
  _user?:
    | OwnUserResponse<ExtendableGenerics>
    | UserResponse<ExtendableGenerics>;
  activeChannels: {
    [key: string]: Channel<ExtendableGenerics>;
  };
  anonymous: boolean;
  persistUserOnConnectionFailure?: boolean;
  // axiosInstance: AxiosInstance
  baseURL?: string = "";
  browser: boolean;
  cleaningIntervalRef?: NodeJS.Timeout;
  clientID?: string;
  configs: Configs<ExtendableGenerics>;
  key: string;
  listeners: Record<string, Array<(event: Event<ExtendableGenerics>) => void>>;
  logger = (...opt) => {
    // console.log('===========')
    // console.log('CustomClient->logger::', opt)
    // console.log('===========')
  };

  /**
   * When network is recovered, we re-query the active channels on client. But in single query, you can recover
   * only 30 channels. So its not guaranteed that all the channels in activeChannels object have updated state.
   * Thus in UI sdks, state recovery is managed by components themselves, they don't rely on js client for this.
   *
   * `recoverStateOnReconnect` parameter can be used in such cases, to disable state recovery within js client.
   * When false, user/consumer of this client will need to make sure all the channels present on UI by
   * manually calling queryChannels endpoint.
   */
  recoverStateOnReconnect?: boolean;
  mutedChannels: ChannelMute<ExtendableGenerics>[];
  mutedUsers: Mute<ExtendableGenerics>[];
  node: boolean;
  options: StreamChatOptions;
  secret?: string;
  setUserPromise: ConnectAPIResponse<ExtendableGenerics> | null;
  state: ClientState<ExtendableGenerics>;
  user?: OwnUserResponse<ExtendableGenerics> | UserResponse<ExtendableGenerics>;
  userAgent?: string;
  userID?: string;
  wsBaseURL?: string;
  consecutiveFailures: number;
  // insightMetrics: InsightMetrics
  defaultWSTimeoutWithFallback: number;
  defaultWSTimeout: number;
  private nextRequestAbortController: AbortController | null = null;

  constructor() {
    this.listeners = {};
    this.state = new ClientState<ExtendableGenerics>();
    // a list of channels to hide ws events from
    this.mutedChannels = [];
    this.mutedUsers = [];

    this.setUserPromise = null;
    // keeps a reference to all the channels that are in use
    this.activeChannels = {};
    // mapping between channel groups and configs
    this.configs = {};
    this.anonymous = false;
    // Create a Proxy for the class instance
    const handler = {
      get: function (target, prop) {
        // Check if the property (method) exists
        if (prop in target) {
          return target[prop];
        } else {
          // If the method doesn't exist, return a function that logs the method name and arguments
          return function (...args) {
            console.log("@@@@@@@@@@@@");
            console.log(`Method '${prop}' is not defined. Arguments:`, args);
            console.log("@@@@@@@@@@@@");
          };
        }
      },
    };

    // Create a Proxy for the class instance with the custom handler
    return new Proxy(this, handler);
  }

  setSupabaseClient(supabase: SupabaseClient<Database>) {
    this.supabase = supabase;
  }

  /**
   * connectUser - Set the current user and open a WebSocket connection
   *
   * @param {OwnUserResponse<StreamChatGenerics> | UserResponse<StreamChatGenerics>} user Data about this user. IE {name: "john"}
   * @param {TokenOrProvider} userTokenOrProvider Token or provider
   *
   * @return {ConnectAPIResponse<StreamChatGenerics>} Returns a promise that resolves when the connection is setup
   */
  async connectUser(user) {
    this.anonymous = false;
    /**
     * This one is used by the frontend. This is a copy of the current user object stored on backend.
     * It contains reserved properties and own user properties which are not present in `this._user`.
     */
    this.user = user;
    this.userID = user.id;
    // this one is actually used for requests. This is a copy of current user provided to `connectUser` function.
    this._user = { ...user };

    this.queryChannels({});
  }

  /**
   * "hint": "Try changing 'messages' to one of the following:
   * 'messages!messages_parent_id_fkey',
   * 'messages!messages_quoted_message_id_fkey'. Find the desired relationship in the 'details' key.",
   * @returns
   */
  async queryChannels(...args) {
    const { data, error } = await this.supabase
      .schema("chat")
      .from("channels")
      .select(
        `*,
        messages(*,
          user:users(*),
          latest_reactions:reactions(*, user:users(*)),
          quoted_message: quoted_message_id(*, user:users(*)),
          reply_count:messages!parent_id(count)
        )`,
      );
    // console.log('SUPACustomClient->queryChannels::', JSON.stringify({ data, error }, null, 2))
    const skipInitialization = [];
    const offlineMode = false;
    const channelsData = (data || []).map((channel) => {
      return {
        ...fakeChannelObject,
        channel: {
          ...fakeChannelObject.channel,
          ...channel,
          cid: `${channel.type}:${channel.id}`,
        },
        // messages: channel.messages || [],
        messages: (channel.messages || []).map((message) => ({
          ...message,
          reply_count: message.reply_count?.length
            ? message.reply_count[0].count
            : 0,
          // quoted_message: message.quoted_message?.length ? message.quoted_message[0] : null,
        })),
      };
    });

    // console.log('mapped data::', JSON.stringify(channelsData, null, 2))
    // console.log('===========')

    for (const channelState of channelsData) {
      this._addChannelConfig(channelState.channel);
    }

    const channels: Channel<ExtendableGenerics>[] = [];

    for (const channelState of channelsData) {
      const c = this.channel(
        channelState.channel.type,
        channelState.channel.id,
      );
      c.data = channelState.channel;
      c.offlineMode = offlineMode;
      c.initialized = !offlineMode;

      if (skipInitialization === undefined) {
        c._initializeState(channelState, "latest");
      } else if (!skipInitialization.includes(channelState.channel.id)) {
        c.state.clearMessages();
        c._initializeState(channelState, "latest");
      }

      channels.push(c);
    }

    this.dispatchEvent({
      type: "channels.queried",
      queriedChannels: {
        channels,
        isLatestMessageSet: true,
      },
    });

    return channels;
  }

  dispatchEvent = (event: Event<StreamChatGenerics>) => {
    if (!event.received_at) event.received_at = new Date();

    // client event handlers
    const postListenerCallbacks = this._handleClientEvent(event);

    // channel event handlers
    const cid = event.cid;
    const channel = cid ? this.activeChannels[cid] : undefined;
    if (channel) {
      channel._handleChannelEvent(event);
    }

    this._callClientListeners(event);

    if (channel) {
      channel._callChannelListeners(event);
    }

    postListenerCallbacks.forEach((c) => c());
  };

  handleEvent = (messageEvent: WebSocket.MessageEvent) => {
    // dispatch the event to the channel listeners
    const jsonString = messageEvent.data as string;
    const event = JSON.parse(jsonString) as Event<StreamChatGenerics>;
    this.dispatchEvent(event);
  };

  _handleClientEvent(event: Event<StreamChatGenerics>) {
    const client = this;
    const postListenerCallbacks = [];
    this.logger(
      "info",
      `client:_handleClientEvent - Received event of type { ${event.type} }`,
      {
        tags: ["event", "client"],
        event,
      },
    );

    if (
      event.type === "user.presence.changed" ||
      event.type === "user.updated" ||
      event.type === "user.deleted"
    ) {
      this._handleUserEvent(event);
    }

    if (event.type === "health.check" && event.me) {
      client.user = event.me;
      client.state.updateUser(event.me);
      client.mutedChannels = event.me.channel_mutes;
      client.mutedUsers = event.me.mutes;
    }

    if (event.channel && event.type === "notification.message_new") {
      this._addChannelConfig(event.channel);
    }

    if (
      event.type === "notification.channel_mutes_updated" &&
      event.me?.channel_mutes
    ) {
      const currentMutedChannelIds: string[] = [];
      const nextMutedChannelIds: string[] = [];

      this.mutedChannels.forEach(
        (mute) => mute.channel && currentMutedChannelIds.push(mute.channel.cid),
      );
      event.me.channel_mutes.forEach(
        (mute) => mute.channel && nextMutedChannelIds.push(mute.channel.cid),
      );

      /** Set the unread count of un-muted channels to 0, which is the behaviour of backend */
      currentMutedChannelIds.forEach((cid) => {
        if (!nextMutedChannelIds.includes(cid) && this.activeChannels[cid]) {
          this.activeChannels[cid].state.unreadCount = 0;
        }
      });

      this.mutedChannels = event.me.channel_mutes;
    }

    if (event.type === "notification.mutes_updated" && event.me?.mutes) {
      this.mutedUsers = event.me.mutes;
    }

    if (
      event.type === "notification.mark_read" && event.unread_channels === 0
    ) {
      const activeChannelKeys = Object.keys(this.activeChannels);
      activeChannelKeys.forEach(
        (
          activeChannelKey,
        ) => (this.activeChannels[activeChannelKey].state.unreadCount = 0),
      );
    }

    if (
      (event.type === "channel.deleted" ||
        event.type === "notification.channel_deleted") &&
      event.cid
    ) {
      client.state.deleteAllChannelReference(event.cid);
      this.activeChannels[event.cid]?._disconnect();

      postListenerCallbacks.push(() => {
        if (!event.cid) return;

        delete this.activeChannels[event.cid];
      });
    }

    return postListenerCallbacks;
  }

  /**
   * @private
   *
   * Handle following user related events:
   * - user.presence.changed
   * - user.updated
   * - user.deleted
   *
   * @param {Event} event
   */
  _handleUserEvent = (event: Event<StreamChatGenerics>) => {
    if (!event.user) {
      return;
    }

    /** update the client.state with any changes to users */
    if (
      event.type === "user.presence.changed" || event.type === "user.updated"
    ) {
      if (event.user.id === this.userID) {
        const user = { ...(this.user || {}) };
        const _user = { ...(this._user || {}) };

        // Remove deleted properties from user objects.
        for (const key in this.user) {
          if (key in event.user || isOwnUserBaseProperty(key)) {
            continue;
          }

          delete user[key];
          delete _user[key];
        }

        /** Updating only available properties in _user object. */
        for (const key in event.user) {
          if (_user && key in _user) {
            _user[key] = event.user[key];
          }
        }

        // @ts-expect-error
        this._user = { ..._user };
        this.user = { ...user, ...event.user };
      }

      this.state.updateUser(event.user);
      this._updateMemberWatcherReferences(event.user);
    }

    if (event.type === "user.updated") {
      this._updateUserMessageReferences(event.user);
    }

    if (
      event.type === "user.deleted" &&
      event.user.deleted_at &&
      (event.mark_messages_deleted || event.hard_delete)
    ) {
      this._deleteUserMessageReference(event.user, event.hard_delete);
    }
  };

  /**
   * TODO: add event listeners
   * on:: notification.added_to_channel
   * on:: channel.deleted
   * on:: channel.hidden
   * on:: channel.truncated
   * on:: channel.updated
   * on:: channel.visible
   * on:: message.new
   * on:: notification.message_new
   * on:: notification.removed_from_channel
   * on:: user.presence.changed
   * on:: user.updated
   * on:: connection.changed
   * on:: connection.recovered
   * on:: notification.mutes_updated
   * on:: notification.channel_mutes_updated
   * on:: notification.mark_read
   * on:: notification.channel_mutes_updated
   * on:: notification.mark_read
   * on:: notification.channel_mutes_updated
   * on:: notification.mark_read
   * @param event
   * @param callback
   * @returns
   */
  on(event, callback) {
    // const channel = this.supabase.channel(event)
    console.log("===========", event);
    console.log("on::", event);

    return {
      unsubscribe: () => {
        console.log("===========");
        console.log("customClient->unsubscribe::", event);
        console.log("===========");
      },
    };
  }
  off(callback: EventHandler<ExtendableGenerics>) {
    console.log("===========");
    console.log("customClient->off::");
    console.log("===========");
  }

  _addChannelConfig({ cid, config }: ChannelResponse<ExtendableGenerics>) {
    this.configs[cid] = config;
  }

  /**
   * channel - Returns a new channel with the given type, id and custom data
   *
   * If you want to create a unique conversation between 2 or more users; you can leave out the ID parameter and provide the list of members.
   * Make sure to await channel.create() or channel.watch() before accessing channel functions:
   * ie. channel = client.channel("messaging", {members: ["tommaso", "thierry"]})
   * await channel.create() to assign an ID to channel
   *
   * @param {string} channelType The channel type
   * @param {string | ChannelData<ExtendableGenerics> | null} [channelIDOrCustom]   The channel ID, you can leave this out if you want to create a conversation channel
   * @param {object} [custom]    Custom data to attach to the channel
   *
   * @return {channel} The channel object, initialize it using channel.watch()
   */
  channel(
    channelType: string,
    channelID?: string | null,
    custom?: ChannelData<ExtendableGenerics>,
  ): Channel<ExtendableGenerics>;
  channel(
    channelType: string,
    custom?: ChannelData<ExtendableGenerics>,
  ): Channel<ExtendableGenerics>;
  channel(
    channelType: string,
    channelIDOrCustom?: string | ChannelData<ExtendableGenerics> | null,
    custom: ChannelData<ExtendableGenerics> = {} as ChannelData<
      ExtendableGenerics
    >,
  ) {
    // if (!this.userID && !this._isUsingServerAuth()) {
    //   throw Error('Call connectUser or connectAnonymousUser before creating a channel');
    // }

    if (~channelType.indexOf(":")) {
      throw Error(
        `Invalid channel group ${channelType}, can't contain the : character`,
      );
    }

    // support channel("messaging", {options})
    if (channelIDOrCustom && typeof channelIDOrCustom === "object") {
      return this.getChannelByMembers(channelType, channelIDOrCustom);
    }

    // // support channel("messaging", undefined, {options})
    if (
      !channelIDOrCustom && typeof custom === "object" && custom.members?.length
    ) {
      return this.getChannelByMembers(channelType, custom);
    }

    // support channel("messaging", null, {options})
    // support channel("messaging", undefined, {options})
    // support channel("messaging", "", {options})
    if (!channelIDOrCustom) {
      return new Channel<ExtendableGenerics>(
        this,
        channelType,
        undefined,
        custom,
      );
    }

    return this.getChannelById(channelType, channelIDOrCustom, custom);
  }

  /**
   * It's a helper method for `client.channel()` method, used to create unique conversation or
   * channel based on member list instead of id.
   *
   * If the channel already exists in `activeChannels` list, then we simply return it, since that
   * means the same channel was already requested or created.
   *
   * Otherwise we create a new instance of Channel class and return it.
   *
   * @private
   *
   * @param {string} channelType The channel type
   * @param {object} [custom]    Custom data to attach to the channel
   *
   * @return {channel} The channel object, initialize it using channel.watch()
   */
  getChannelByMembers = (
    channelType: string,
    custom: ChannelData<ExtendableGenerics>,
  ) => {
    // Check if the channel already exists.
    // Only allow 1 channel object per cid
    const membersStr = [...(custom.members || [])].sort().join(",");
    const tempCid = `${channelType}:!members-${membersStr}`;

    if (!membersStr) {
      throw Error(
        "Please specify atleast one member when creating unique conversation",
      );
    }

    // channel could exist in `activeChannels` list with either one of the following two keys:
    // 1. cid - Which gets set on channel only after calling channel.query or channel.watch or channel.create
    // 2. Sorted membersStr - E.g., "messaging:amin,vishal" OR "messaging:amin,jaap,tom"
    //                        This is set when you create a channel, but haven't queried yet. After query,
    //                        we will replace it with `cid`
    for (const key in this.activeChannels) {
      const channel = this.activeChannels[key];
      if (channel.disconnected) {
        continue;
      }

      if (key === tempCid) {
        return channel;
      }

      if (key.indexOf(`${channelType}:!members-`) === 0) {
        const membersStrInExistingChannel = Object.keys(channel.state.members)
          .sort().join(",");
        if (membersStrInExistingChannel === membersStr) {
          return channel;
        }
      }
    }

    const channel = new Channel<ExtendableGenerics>(
      this,
      channelType,
      undefined,
      custom,
    );

    // For the time being set the key as membersStr, since we don't know the cid yet.
    // In channel.query, we will replace it with 'cid'.
    this.activeChannels[tempCid] = channel;
    return channel;
  };

  /**
   * Its a helper method for `client.channel()` method, used to channel given the id of channel.
   *
   * If the channel already exists in `activeChannels` list, then we simply return it, since that
   * means the same channel was already requested or created.
   *
   * Otherwise we create a new instance of Channel class and return it.
   *
   * @private
   *
   * @param {string} channelType The channel type
   * @param {string} [channelID] The channel ID
   * @param {object} [custom]    Custom data to attach to the channel
   *
   * @return {channel} The channel object, initialize it using channel.watch()
   */
  getChannelById = (
    channelType: string,
    channelID: string,
    custom: ChannelData<ExtendableGenerics>,
  ) => {
    if (typeof channelID === "string" && ~channelID.indexOf(":")) {
      throw Error(
        `Invalid channel id ${channelID}, can't contain the : character`,
      );
    }

    // only allow 1 channel object per cid
    const cid = `${channelType}:${channelID}`;
    if (cid in this.activeChannels && !this.activeChannels[cid].disconnected) {
      const channel = this.activeChannels[cid];
      if (Object.keys(custom).length > 0) {
        channel.data = custom;
        channel._data = custom;
      }
      return channel;
    }

    // console.log('===========')
    // console.log(
    //   'CustomClient->getChannelById::',
    //   JSON.stringify({ channelType, channelID, custom, activeChannels: this.activeChannels })
    // )
    // console.log('===========')
    const channel = new Channel<ExtendableGenerics>(
      this,
      channelType,
      channelID,
      custom,
    );
    this.activeChannels[channel.cid] = channel;

    return channel;
  };

  _muteStatus(cid: string) {
    let muteStatus;
    for (let i = 0; i < this.mutedChannels.length; i++) {
      const mute = this.mutedChannels[i];
      if (mute.channel?.cid === cid) {
        muteStatus = {
          muted: mute.expires
            ? new Date(mute.expires).getTime() > new Date().getTime()
            : true,
          createdAt: mute.created_at ? new Date(mute.created_at) : new Date(),
          expiresAt: mute.expires ? new Date(mute.expires) : null,
        };
        break;
      }
    }

    if (muteStatus) {
      return muteStatus;
    }

    return {
      muted: false,
      createdAt: null,
      expiresAt: null,
    };
  }

  get(url: string, data?: any, config?: any) {
    const $this = this;
    const routes = [
      {
        pattern: /^\/messages\/([a-f\d-]+)\/replies$/,
        handler: async function (messageId) {
          const { data, error, count } = await $this.supabase
            .schema("chat")
            .from("messages")
            .select(
              `
              *,
              user:users(*),
              latest_reactions:reactions(*, user:users(*)),
              quoted_message: quoted_message_id(*, user:users(*)),
              reply_count:messages!parent_id(count)
            `,
            )
            .eq("parent_id", messageId);

          return {
            messages: data,
          };
        },
      },
    ];

    // Iterate through the routes and find a match
    for (const route of routes) {
      const match = url.match(route.pattern);
      if (match) {
        // Call the corresponding handler function with captured groups

        return route.handler(...match.slice(1));
      }
    }

    console.log("===========");
    console.log(
      "customClient->get::",
      JSON.stringify(
        {
          url,
          data,
          config,
        },
        null,
        2,
      ),
    );
  }
  // http verbs
  post(url: string, data?: any, config?: any) {
    const $this = this;

    /**
     * url examples:
     * /channels/messaging/0b99b878-2195-43be-9666-18f96078a188/event
     * /channels/messaging/0b99b878-2195-43be-9666-18f96078a188/message
     *
     * create catcher for each url
     */
    // Define the URL patterns and corresponding functions
    const routes = [
      {
        pattern: /^\/channels\/messaging\/([a-f\d-]+)\/event$/,
        handler: function (channelId) {
          console.log(`Event for channel ${channelId}::`, data);
        },
      },
      {
        pattern: /^\/channels\/messaging\/([a-f\d-]+)\/message$/,
        handler: async function (channelId) {
          console.log("/////////////////////");
          console.log(
            "customClient->post::",
            JSON.stringify(data.message, null, 2),
          );
          console.log("===========");
          const result = await $this.supabase
            .schema("chat")
            .from("messages")
            .upsert([{ channel_id: channelId, ...data.message }])
            // .upsert([
            //   {
            //     channel_id: channelId,
            //     id: data.message.id,
            //     text: data.message.text,
            //     attachments: data.message.attachments,
            //     mentioned_users: data.message.mentioned_users,
            //   },
            // ])
            .select(`*, user:users(*)`)
            .single();
          // .upsert([{ channel_id: channelId, id: data.message.id, text: data.message.text }])
          console.log("===========");
          console.log(
            "SUPACustomClient->post:chat_messages::",
            JSON.stringify({ result }, null, 2),
          );
          console.log("===========");
          if (result.error) {
            return {
              error: result.error,
              status: MessageStatusTypes.FAILED,
            };
          }

          return {
            message: result.data,
            status: MessageStatusTypes.RECEIVED,
          };
        },
      },
      {
        pattern: /^\/messages\/([a-f\d-]+)\/reaction$/,
        handler: async function (messageId) {
          if (!$this.user) {
            throw Error(
              "Call connectUser or connectAnonymousUser before creating a channel",
            );
          }
          const result = await $this.supabase
            .schema("chat")
            .from("reactions")
            .upsert([
              {
                user_id: $this.user.id,
                message_id: messageId,
                type: data.reaction.type,
              },
            ])
            .select(`*, user:users(*)`)
            .single();
          console.log("===========");
          console.log(
            "SUPACustomClient->post:message_reaction::",
            JSON.stringify({ result }, null, 2),
          );
          console.log("===========");
          if (result.error) {
            return {
              error: result.error,
              status: MessageStatusTypes.FAILED,
            };
          }

          return {
            message: result.data,
            status: MessageStatusTypes.RECEIVED,
          };
        },
      },
      // Add more routes as needed
    ];

    // Iterate through the routes and find a match
    for (const route of routes) {
      const match = url.match(route.pattern);
      if (match) {
        // Call the corresponding handler function with captured groups

        return route.handler(...match.slice(1));
      }
    }

    // If no match is found, handle it or throw an error
    console.log("/////////////////////");
    console.log("/////////////////////");
    console.log("/////////////////////");
    console.log(
      "customClient->post::",
      JSON.stringify(
        {
          url,
          data,
          config,
        },
        null,
        2,
      ),
    );
    console.log("===========");
  }

  /**
   * creates an abort controller that will be used by the next HTTP Request.
   */
  createAbortControllerForNextRequest() {
    return (this.nextRequestAbortController = new AbortController());
  }

  async deleteMessage(messageID: string, hardDelete?: boolean) {
    let params = {};
    if (hardDelete) {
      params = { hard: true };
    }
    return this.supabase.schema("chat").from("messages").delete().match({
      id: messageID,
    });
  }

  async sendFile(
    url: string,
    uri: string | NodeJS.ReadableStream | Buffer | File,
    name?: string,
    contentType?: string,
  ) {
    if (!this.user) {
      throw Error(
        "Call connectUser or connectAnonymousUser before creating a channel",
      );
    }
    const data = addFileToFormData(
      uri,
      name,
      contentType || "multipart/form-data",
    );

    // TODO: change to chat storage with the prefix of
    // channel id and the user id,
    // and if possible move the file to the message id
    const result = await this.supabase.storage
      .from("avatars")
      .upload(`${this.user.id}/chat/${name}`, data, {
        contentType,
        upsert: true,
      });
    if (result.error) {
      console.log(result.error);
      throw new Error(result.error.message);
    }
    const publicUrlRes = await this.supabase.storage
      .from("avatars")
      .getPublicUrl(result.data.path.replace(`avatars/`, ""));

    return {
      file: publicUrlRes.data.publicUrl,
      duration: 0,
    };
  }
}
