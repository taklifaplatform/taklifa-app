import { useEffect } from 'react';
import { DevToken } from 'stream-chat';
import { ZixChat } from './ZixChat';
import { useAuth } from '@zix/services/auth';

const client = ZixChat.getInstance('000000');
client.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`;

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
