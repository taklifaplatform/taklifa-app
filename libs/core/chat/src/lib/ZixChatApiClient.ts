import { Database } from "@zix/core/supabase";
import { DefaultGenerics, ExtendableGenerics } from "stream-chat/src/types";
import { ZixChat } from "./ZixChat";
import { MessageStatusTypes } from "./constants";
import { getAppData } from "./data-responses/get-app-data";
import { fakeChannelObject } from "./fakeChannelObject";

const MESSAGE_WITH_RELATIONS_QUERY = `
  *,
  user:users(*),
  latest_reactions:reactions(*, user:users(*)),
  quoted_message: quoted_message_id(*, user:users(*)),
  reply_count:messages!parent_id(count)
`;

export class ZixChatApiClient<
  ZixChatGenerics extends ExtendableGenerics = DefaultGenerics,
> {
  client: ZixChat<ZixChatGenerics>;

  router: any = {
    get: [],
    post: [],
    put: [],
    patch: [],
    postForm: [],
    delete: [],
    options: [],
  };

  constructor(client: ZixChat<ZixChatGenerics>) {
    this.client = client;
    // GET /app
    this.router.get.push({
      pattern: /^\/app$/,
      handler: async () => {
        return {
          data: getAppData,
          status: 200,
        };
      },
    });

    // GET /messages/{message_id}/replies
    this.router.get.push({
      pattern: /^\/messages\/([a-f\d-]+)\/replies$/,
      handler: async (messageId) => {
        const {
          data: messages,
          error,
          count,
        } = await this.client.supabase
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
          data: {
            messages,
          },
          status: 200,
        };
      },
    });

    // POST /channels
    this.router.post.push({
      pattern: /^\/channels$/,
      handler: async (filters, { params }) => {
        if (!this.client.user?.id) {
          return {
            error: "User is not logged in",
            status: 401,
          };
        }
        // console.log(`Get channels`, { filters, requestConfig })
        const { data, error } = await this.client.supabase
          .schema("chat")
          .from("channels")
          .select(
            `*,
            messages(${MESSAGE_WITH_RELATIONS_QUERY})`,
          );

        const channels = (data || []).map((channel) => {
          return {
            ...fakeChannelObject,
            channel: {
              ...fakeChannelObject.channel,
              ...channel,
              cid: `${channel.type}:${channel.id}`,
            },
            // messages: channel.messages || [],
            messages: (channel.messages || []).map(
              this._mapMessageObject.bind(this),
            ),
          };
        });
        return {
          data: {
            channels,
          },
          status: 200,
          // error,
        };
      },
    });
    // POST /channels/messaging/{channelId}/event
    this.router.post.push({
      pattern: /^\/channels\/messaging\/([a-f\d-]+)\/event$/,
      handler: async (channelId, data, req) => {
        // console.log('/////////////////////')
        // console.log(
        //   'NEW CHANNEL EVENT::',
        //   JSON.stringify(
        //     {
        //       channelId,
        //       data,
        //       req,
        //     },
        //     null,
        //     2
        //   )
        // )
        const event = {
          cid: `messaging:${channelId}`,
          type: data.event.type,
          channel_type: "messaging",
          channel_id: channelId,
          user: this.client.user,
          created_at: new Date().toISOString(),
        };
        return this.broadcastEvent(event);
      },
    });

    // POST /channels/messaging/{channelId}/reaction (DONE)
    this.router.post.push({
      pattern: /^\/messages\/([a-f\d-]+)\/reaction$/,
      handler: async (messageId: string, data, req) => {
        const reaction = {
          message_id: messageId,
          ...data.reaction,
        };

        const result = await this.client.supabase
          .schema("chat")
          .from("reactions")
          .upsert([reaction])
          .select(`*, user:users(*)`)
          .single();

        if (result.error) {
          return {
            error: result.error,
            status: MessageStatusTypes.FAILED,
          };
        }

        const retrieveMessage = await this.client.supabase
          .schema("chat")
          .from("messages")
          .select(MESSAGE_WITH_RELATIONS_QUERY)
          .eq("id", messageId)
          .single();
        const channelId = retrieveMessage.data?.channel_id;

        const event = {
          cid: `messaging:${channelId}`,
          type: "reaction.new",
          channel_type: "messaging",
          channel_id: channelId,
          user: result.data.user,
          created_at: result.data.created_at,
          message: this._mapMessageObject(retrieveMessage.data),
          reaction: result.data,
        };
        this.broadcastEvent(event);
        this.client.dispatchEvent(event);

        return {
          data: {
            message: retrieveMessage.data,
            reaction: result.data,
            status: MessageStatusTypes.RECEIVED,
          },
          status: 200,
        };
      },
    });

    // DELETE /channels/messaging/{channelId}/reaction/{reactionType} (DONE)
    this.router.delete.push({
      pattern: /^\/messages\/([a-f\d-]+)\/reaction\/([^]+)$/,
      handler: async (messageId: string, reactionType: string, data, req) => {
        if (!this.client.user?.id) {
          return {
            error: "User is not logged in",
            status: 401,
          };
        }

        const retrieveReaction = await this.client.supabase
          .schema("chat")
          .from("reactions")
          .select(`*, user:users(*)`)
          .eq("user_id", this.client.user?.id)
          .eq("message_id", messageId)
          .eq("type", reactionType)
          .single();

        if (!retrieveReaction.data) {
          return {
            status: 404,
          };
        }

        await this.client.supabase.schema("chat").from(
          "reactions",
        ).delete().match({
          user_id: this.client.user?.id,
          message_id: messageId,
          type: reactionType,
        }).single();

        const retrieveMessage = await this.client.supabase
          .schema("chat")
          .from("messages")
          .select(MESSAGE_WITH_RELATIONS_QUERY)
          .eq("id", messageId)
          .single();
        const channelId = retrieveMessage.data?.channel_id;

        const event = {
          cid: `messaging:${channelId}`,
          type: "reaction.deleted",
          channel_type: "messaging",
          channel_id: channelId,
          user: this.client.user,
          created_at: retrieveReaction.data.created_at,
          message: this._mapMessageObject(retrieveMessage.data),
          reaction: retrieveReaction.data,
        };
        this.broadcastEvent(event);
        this.client.dispatchEvent(event as any);

        return {
          data: {
            message: retrieveMessage.data,
            reaction: retrieveReaction.data,
            status: MessageStatusTypes.RECEIVED,
          },
          status: 200,
        };
      },
    });

    // POST /channels/messaging/{channelId}/message (Done)
    this.router.post.push({
      pattern: /^\/channels\/messaging\/([a-f\d-]+)\/message$/,
      handler: async (channelId, data, req) => {
        const message = {
          channel_id: channelId,
          ...data.message,
        };

        const result = await this.client.supabase
          .schema("chat")
          .from("messages")
          .upsert([message])
          .select(`*, user:users(*)`)
          .single();

        if (result.error) {
          return {
            error: result.error,
            status: MessageStatusTypes.FAILED,
          };
        }

        const event = {
          cid: `messaging:${channelId}`,
          type: "message.new",
          channel_type: "messaging",
          channel_id: channelId,
          user: result.data.user,
          created_at: result.data.created_at,
          message: result.data,
        };
        this.broadcastEvent(event);

        return {
          data: {
            message: result.data,
            status: MessageStatusTypes.RECEIVED,
          },
          status: 200,
        };
      },
    });

    // DELETE /messages/{messageId} (DONE)
    this.router.delete.push({
      pattern: /^\/messages\/([a-f\d-]+)$/,
      handler: async (messageId: string, data, req) => {
        const result = await this.client.supabase
          .schema("chat")
          .from("messages")
          .update({
            type: "deleted",
          })
          .eq("id", messageId)
          .select(MESSAGE_WITH_RELATIONS_QUERY)
          .single();

        if (result.error) {
          console.log("DELETE hav error", result.error);
          return {
            error: result.error,
            status: MessageStatusTypes.FAILED,
          };
        }

        const channelId = result.data?.channel_id;

        const event = {
          cid: `messaging:${channelId}`,
          type: "message.deleted",
          channel_type: "messaging",
          channel_id: channelId,
          user: this.client.user,
          created_at: result.data.created_at,
          received_at: new Date().toISOString(),
          message: {
            ...result.data,
            cid: `messaging:${channelId}`,
          },
        };
        this.broadcastEvent(event);
        this.client.dispatchEvent(event as any);

        return {
          data: {
            message: result.data,
            status: MessageStatusTypes.RECEIVED,
          },
          status: 200,
        };
      },
    });
    // POST /channels/messaging/{channelId}/image
    this.router.postForm.push({
      pattern: /^\/channels\/messaging\/([a-f\d-]+)\/image$/,
      handler: async (channelId, data, req) => {
        console.log("/////////////////////");
        console.log(
          "Upload file::",
          JSON.stringify(
            {
              channelId,
              req,
            },
            null,
            2,
          ),
          data,
        );

        if (!this.client.user?.id) {
          return {
            error: "User is not logged in",
            status: 401,
          };
        }

        const result = await this.client.supabase.storage
          .from("avatars")
          .upload(`${this.client.user.id}/chat/image.png`, data, {
            // contentType,
            upsert: true,
          });
        // const result = await this.client.supabase.storage
        //   .from('avatars')
        //   .upload(`${this.client.user.id}/chat/${name}`, data, {
        //     contentType,
        //     upsert: true,
        //   })
        if (result.error) {
          console.log(result.error);
          throw new Error(result.error.message);
        }
        const publicUrlRes = await this.client.supabase.storage
          .from("avatars")
          .getPublicUrl(result.data.path.replace(`avatars/`, ""));

        return {
          data: {
            file: publicUrlRes.data.publicUrl,
            duration: 0,
          },
          status: 200,
        };
      },
    });
  }

  // TODO: replace on backend edge functions
  async broadcastEvent(event) {
    if (!this.client.wsConnection?.globalChannel) {
      console.log("======");
      console.log("broadcastEvent: global channel is not connected yet");
      console.log("======");
      return;
    }
    await this.client.wsConnection.globalChannel.send({
      type: "broadcast",
      event: event.type,
      payload: event,
    });

    return {
      event: event,
      duration: "1.15ms",
      status: 200,
    };
  }

  resolveRoute(method, url, ...args) {
    // Iterate through the routes and find a match
    for (const route of this.router[method]) {
      const match = url.match(route.pattern);
      if (match) {
        // Call the corresponding handler function with captured groups
        return route.handler(...match.slice(1), ...args);
      }
    }
    console.log("==== REQUEST NOT HANDLED YET ====");
    console.log(
      `${this.client.user?.name} :::`,
      "ZixChatApiClient->",
      method,
      JSON.stringify({ url, args }, null, 2),
    );
    console.log("========");
    return { data: {}, error: null };
  }
  async get(url, requestConfig) {
    return this.resolveRoute("get", url, requestConfig);
  }
  async post(url, data, requestConfig) {
    return this.resolveRoute("post", url, data, requestConfig);
  }
  async put(url, data, requestConfig) {
    return this.resolveRoute("put", url, data, requestConfig);
  }
  async patch(url, data, requestConfig) {
    return this.resolveRoute("patch", url, data, requestConfig);
  }
  async postForm(url, data, requestConfig) {
    return this.resolveRoute("postForm", url, data, requestConfig);
  }
  async delete(url, requestConfig) {
    return this.resolveRoute("delete", url, requestConfig);
  }
  async options(url, requestConfig) {
    return this.resolveRoute("options", url, requestConfig);
  }

  _mapMessageObject(message: any) {
    let reply_count = 0;
    const reaction_counts: any = {};
    const reaction_scores: any = {};

    const own_reactions: any[] = []; // TODO: better to get it from message.reactions query filter;

    message.latest_reactions?.forEach(
      (reaction: Database["chat"]["Tables"]["reactions"]["Row"]) => {
        reaction_counts[reaction.type] = reaction_counts[reaction.type] || 0;
        reaction_counts[reaction.type] += 1;
        reaction_scores[reaction.type] = reaction_scores[reaction.type] || 0;
        reaction_scores[reaction.type] += reaction.score;

        if (this.client?.user?.id === reaction.user_id) {
          own_reactions.push(reaction);
        }
      },
    );

    if (message.reply_count?.length) {
      reply_count = message.reply_count[0].count;
    }

    return {
      ...message,
      reply_count,
      reaction_counts,
      reaction_scores,
      own_reactions,
      // quoted_message: message.quoted_message?.length ? message.quoted_message[0] : null,
    };
  }
}
