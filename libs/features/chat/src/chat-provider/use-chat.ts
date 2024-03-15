import { useAuth } from "@zix/utils";
import { ZixChat } from "./ZixChat";
import { useEffect } from "react";
import { DevToken } from "stream-chat";
import { OpenAPI } from "@zix/api";

const client = ZixChat.getInstance("000000");
client.baseURL = `${OpenAPI.BASE}/api/chat`;

export function useChat() {
  const { user, authAccessToken } = useAuth();

  useEffect(() => {
    if (user?.id && !client.userID) {
      client.options.axiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${authAccessToken}`,
        },
      };
      client.connectUser(user as any, DevToken(`${user.id}`));
      // client.connectUser(user as any, DevToken(`${user.id}`));
    }
  }, [user, authAccessToken]);

  return {
    client,
  };
}
