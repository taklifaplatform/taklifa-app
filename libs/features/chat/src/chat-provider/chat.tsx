/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAuth } from '@zix/utils';
import React from 'react';
import { Chat } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { StreamChat } from './CustomChat';
import { useThemeSetting } from '@tamagui/next-theme';


export type ChatProviderProps = {
  children: React.ReactNode;
};

const client = StreamChat.getInstance('are', 'zer', {
  logger: (logLevel, msg, extraData) => {
    console.log('====================');
    console.log('StreamChat::', msg);
    console.log('====================');
  },
});

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  ...props
}) => {
  const { user } = useAuth();
  const { current } = useThemeSetting()

  React.useEffect(() => {
    if (user?.id && !client.userID) {
      client.connectUser(user as any);
    }

    return () => {
      // client.disconnectUser();
    }
  }, [user]);
  return (
    // @ts-ignore
    <Chat client={client} theme={current === 'light' ? 'str-chat__theme-light' : 'str-chat__theme-dark'}>
      {children}
    </Chat>
  );
};

export default ChatProvider;
