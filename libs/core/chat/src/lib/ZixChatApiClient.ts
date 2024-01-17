import { DefaultGenerics, ExtendableGenerics } from "stream-chat/src/types";
import { ZixChat } from "./ZixChat";
import { MessageStatusTypes } from "./constants";
import { getAppData } from "./data-responses/get-app-data";
import { fakeChannelObject } from "./fakeChannelObject";

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
        // console.log(`Get channels`, { filters, requestConfig })
        const { data, error } = await this.client.supabase
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

        const channels = (data || []).map((channel) => {
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

        // return new Promise((resolve, reject) => {
        //   const channel = this.client.supabase
        //     .channel(cid, {
        //       config: {
        //         broadcast: { self: true },
        //       },
        //     })
        //     .subscribe(async (status) => {
        //       if (status !== 'SUBSCRIBED') {
        //         return
        //       }

        //       await channel.send({
        //         type: 'broadcast',
        //         event: data.event.type,
        //         payload: eventData,
        //       })

        //       this.client.supabase.removeChannel(channel)
        //       resolve({
        //         event: eventData,
        //         duration: '1.15ms',
        //         status: 200,
        //       })
        //     })
        // })
      },
    });

    // POST /channels/messaging/{channelId}/query
    this.router.post.push({
      pattern: /^\/channels\/messaging\/([a-f\d-]+)\/message$/,
      handler: async (channelId, data, req) => {
        const message = {
          channel_id: channelId,
          ...data.message,
          id: data.message.id.replace(`${this.client.user?.id}-`, ""),
        };

        const result = await this.client.supabase
          .schema("chat")
          .from("messages")
          .upsert([message])
          .select(`*, user:users(*)`)
          .single();

        console.log("===========");
        console.log(
          "SUPACustomClient->post:chat_messages::",
          JSON.stringify({ message, result }, null, 2),
        );
        console.log("===========");
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
    console.log("========");
    console.log(
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
}
