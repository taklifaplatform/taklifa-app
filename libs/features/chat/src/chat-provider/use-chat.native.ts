import { useEffect } from 'react';
import { DevToken } from 'stream-chat';
import { ZixChat } from './ZixChat';
import { useAuth } from '@zix/services/auth';
import { Streami18n } from 'stream-chat-expo';

import { t } from 'i18next';

const client = ZixChat.getInstance('000000');
client.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`;

const i18nInstance = new Streami18n({
  translationsForLanguage: {
    "Empty message...": t('app:common.emptyMessage'),
    "Send a message": t('app:common.sendMessage'),
    "You": t('app:common.you'),
    "Photos and Videos": t('forms:photos-and-videos'),
    "AM": "ammmmm",
    "Nothing yet...": t('app:common.nothingYet'),

  },
});

export function useChat() {
  const { user, authAccessToken } = useAuth();

  useEffect(() => {
    if (authAccessToken && user?.id && !client.userID) {
      client.options.axiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${authAccessToken}`,
        },
      };
      client.connectUser(user as any, DevToken(`${user.id}`));
    } else if (!authAccessToken && !user?.id && client.userID) {
      client.disconnectUser();
    }
  }, [user, authAccessToken]);

  return {
    client,
    i18nInstance,
  };
}
