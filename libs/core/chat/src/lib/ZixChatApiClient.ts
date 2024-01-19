import { Database } from "@zix/core/supabase";
import {
  DefaultGenerics,
  ExtendableGenerics,
  MessageResponse,
} from "stream-chat/src/types";
import { ZixChat } from "./ZixChat";
import { MessageStatusTypes } from "./constants";
import { getAppData } from "./data-responses/get-app-data";
import { fakeChannelObject } from "./fakeChannelObject";

import {
  CHAT_CHANNELS_QUERY_SELECTOR,
  CHAT_MESSAGE_WITH_RELATIONS_QUERY,
} from "./queries";

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

    // GET /search TODO: add filters
    this.router.get.push({
      pattern: /^\/search$/,
      handler: async ({ params, headers }) => {
        const exampleParams = {
          "user_id": "46dd14f9-f410-40f5-b4e4-a38f9308aa22",
          "payload": {
            "filter_conditions": {
              "cid": {
                "$in": [
                  "messaging:4c59448d-9bde-4869-bb27-26d88f6bdaf7",
                ],
              },
            },
            "limit": 10,
            "offset": 0,
            "message_filter_conditions": {
              "attachments.type": {
                "$in": [
                  "image",
                ],
              },
            },
          },
        };
        console.log(
          "GET /search",
          JSON.stringify({ params, headers }, null, 2),
        );
        const { data, error } = await this.client.supabase
          .schema("chat")
          .from("messages")
          .select(CHAT_MESSAGE_WITH_RELATIONS_QUERY)
          .not("attachments", "is", null);

        if (error) {
          console.log("==========");
          console.log(
            "GOT CHANNELS",
            JSON.stringify(
              {
                data,
                error,
              },
              null,
              2,
            ),
          );
          console.log("==========");
        }

        const results = (data || []).map(this._mapMessageObject.bind(this));

        return {
          data: {
            results,
          },
          status: 200,
        };
      },
    });

    // POST /channels/messaging/query (DONE)
    this.router.post.push({
      pattern: /^\/channels\/messaging\/query$/,
      handler: async ({ data }, { params }, filter) => {
        console.log("================");
        console.log(
          "/channels/messaging/query::",
          JSON.stringify(
            {
              data,
              params,
              filter,
            },
            null,
            2,
          ),
        );
        console.log("================");
        const startChat = await this.client.supabase.schema("chat")
          .rpc(
            "start_chat",
            data,
          );

        if (startChat.error) {
          console.error(startChat.error);
          return {
            error: startChat.error,
            status: 500,
          };
        }

        if (!startChat?.data?.id) {
          return {
            error: "Channel not created",
            status: 500,
          };
        }
        const result = await this.client.supabase
          .schema("chat")
          .from("channels")
          .select(CHAT_CHANNELS_QUERY_SELECTOR)
          .eq("id", startChat.data.id)
          .single();

        if (result.error) {
          console.log("==========");
          console.log(
            "GOT CHANNELS",
            JSON.stringify(
              result,
              null,
              2,
            ),
          );
          console.log("==========");
        }

        return {
          data: this._mapChannelObject(result.data),
          status: 200,
        };
      },
    });
    // POST /channels/messaging/{message_id}/replies
    this.router.post.push({
      pattern: /^\/channels\/messaging\/([a-f\d-]+)\/query$/,
      handler: async (channelId: string) => {
        const result = await this.client.supabase
          .schema("chat")
          .from("channels")
          .select(CHAT_CHANNELS_QUERY_SELECTOR)
          .eq("id", channelId)
          .single();

        if (result.error) {
          console.log("==========");
          console.log(
            "GOT CHANNELS",
            JSON.stringify(
              result,
              null,
              2,
            ),
          );
          console.log("==========");
        }

        return {
          data: this._mapChannelObject(result.data),
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
      handler: async (filters, params) => {
        console.log("=============");
        console.log(
          "POST /channels",
          JSON.stringify({ filters, params }, null, 2),
        );
        console.log("=============");
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
          .select(CHAT_CHANNELS_QUERY_SELECTOR);

        if (error) {
          console.log("==========");
          console.log(
            "GOT CHANNELS",
            JSON.stringify(
              {
                data,
                error,
              },
              null,
              2,
            ),
          );
          console.log("==========");
        }

        const channels = (data || []).map(this._mapChannelObject.bind(this));
        return {
          data: {
            channels,
          },
          status: 200,
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
          .select(CHAT_MESSAGE_WITH_RELATIONS_QUERY)
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
          message: this._mapMessageObject(retrieveMessage.data, {
            includeOwnReactions: false,
          }),
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
          .select(CHAT_MESSAGE_WITH_RELATIONS_QUERY)
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
          message: this._mapMessageObject(retrieveMessage.data, {
            includeOwnReactions: false,
          }),
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

    // POST /messages/{messageId}
    this.router.post.push({
      pattern: /^\/messages\/([a-f\d-]+)$/,
      handler: async (messageId: string, data, req) => {
        const updateResult = await this.client.supabase
          .schema("chat")
          .from("messages")
          .update({
            text: data.message.text,
            attachments: data.message.attachments,
            quoted_message_id: data.message.quoted_message_id,
            parent_id: data.message.parent_id,
            // TODO: add new props
          })
          .eq("id", messageId);

        if (updateResult.error) {
          console.error(
            "DELETE hav error",
            updateResult.error,
            JSON.stringify({ data, req }, null, 2),
          );
          return {
            error: updateResult.error,
            status: MessageStatusTypes.FAILED,
          };
        }

        const result = await this.client.supabase
          .schema("chat")
          .from("messages")
          .select(CHAT_MESSAGE_WITH_RELATIONS_QUERY)
          .eq("id", messageId)
          .single();

        console.log("RETREIVE AFTRE UPDATE", result);

        if (result.error) {
          console.error(
            "RETREIVE AFTRE UPDATE hav error",
            result,
          );
          return {
            error: result.error,
            status: MessageStatusTypes.FAILED,
          };
        }

        const channelId = result.data?.channel_id;

        // TODO: fix message update
        const event = {
          cid: `messaging:${channelId}`,
          type: "message.updated",
          channel_type: "messaging",
          channel_id: channelId,
          user: this.client.user,
          created_at: result.data.created_at,
          received_at: new Date().toISOString(),
          message: this._mapMessageObject(result.data, {
            includeOwnReactions: false,
          }),
        };
        this.broadcastEvent(event);
        this.client.dispatchEvent(event as any);

        return {
          data: {
            message: this._mapMessageObject(result.data),
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
          .select(CHAT_MESSAGE_WITH_RELATIONS_QUERY)
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
    // POST /channels/messaging/{channelId}/image (DONE)
    this.router.postForm.push({
      pattern: /^\/channels\/messaging\/([a-f\d-]+)\/image$/,
      handler: async (channelId: string, data: any, req) => {
        try {
          if (!this.client.user?.id) {
            return {
              error: "User is not logged in",
              status: 401,
            };
          }

          const result = await this.client.supabase.storage
            .from("chat")
            .upload(
              `${channelId}/${this.client.user.id}/${data.name}`,
              data.formData,
              {
                contentType: data.contentType,
                upsert: true,
              },
            );

          if (result.error) {
            return {
              error: result.error,
              status: 500,
            };
          }
          const publicUrlRes = await this.client.supabase.storage
            .from("chat")
            .getPublicUrl(result.data.path.replace(`chat/`, ""));

          return {
            data: {
              file: publicUrlRes.data.publicUrl,
              duration: 0,
            },
            status: 200,
          };
        } catch (error) {
          return {
            error: error?.message || "Error while uploading file",
            status: 500,
          };
        }
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

  _mapChannelObject(channel: any) {
    const member_count =
      (channel.members_count?.length
        ? channel.members_count[0].count
        : channel?.members?.length) || 50;
    return {
      ...fakeChannelObject,
      channel: {
        ...fakeChannelObject.channel,
        ...channel,
        cid: `${channel.type}:${channel.id}`,
        member_count,
      },
      members: channel.members || [],
      // messages: channel.messages || [],
      messages: (channel.messages || []).map(
        this._mapMessageObject.bind(this),
      ),
    };
  }

  _mapMessageObject(message: any, params = {}): MessageResponse {
    const options = {
      includeOwnReactions: true,
      ...params,
    };

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

        if (
          this.client?.user?.id === reaction.user_id &&
          options.includeOwnReactions
        ) {
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
