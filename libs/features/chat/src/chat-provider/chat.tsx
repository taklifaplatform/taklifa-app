import { useThemeSetting } from '@tamagui/next-theme';
import React from 'react';
import { Chat } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { useChat } from './use-chat';

export type ChatProviderProps = {
  children: React.ReactNode;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
}) => {
  const { client } = useChat()
  const { current } = useThemeSetting();

  return (
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
