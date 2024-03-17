/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAuth } from '@zix/services/auth';
import React from 'react';
import { Chat } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
// import { StreamChat } from 'stream-chat';
import { DevToken } from 'stream-chat';
// import { StreamChat } from './CustomChat';
import { useThemeSetting } from '@tamagui/next-theme';
import { ZixChat } from './ZixChat';

export type ChatProviderProps = {
  children: React.ReactNode;
};

const client = ZixChat.getInstance('000000', undefined, {});
client.baseURL = 'http://sawaeed.test/api/chat';
client.wsBaseURL = 'ws://sawaeed.test:8080/app';
// client.setBaseURL('http://sawaeed.test')
// client.setBaseURL('http://0.0.0.0:8080')
// const client = StreamChat.getInstance('e2yk5ayrht2m', '2x2fbtgpj85ze469udtve9a7azvbh6s5uhkj6v3kzntnuq2vugycw3vrhzsm6x7x', {
//   baseURL: 'http://sawaeed.test',
//   logger: (logLevel, msg, extraData) => {
//     console.log('====================');
//     console.log('StreamChat::', msg);
//     console.log('====================');
//   },
// });

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  ...props
}) => {
  const { user, authAccessToken } = useAuth();
  const { current } = useThemeSetting();

  React.useEffect(() => {
    if (user?.id && !client.userID) {
      client.options.axiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${authAccessToken}`,
        },
      };
      client.connectUser(user as any, DevToken(`${user.id}`));
      // client.connectUser(user as any, DevToken(`${user.id}`));
    }

    return () => {
      // client.disconnectUser();
    };
  }, [user]);
  return (
    // @ts-ignore
    <Chat
      client={client}
      theme={
        current === 'light' ? 'str-chat__theme-light' : 'str-chat__theme-dark'
      }
    >
      {children}
    </Chat>
  );
};

export default ChatProvider;
