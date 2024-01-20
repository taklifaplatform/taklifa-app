import React from 'react';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import {
  ZixChat,
  UserSearchProvider,
  AppOverlayProvider
} from '@zix/core/chat';
import { useUser } from '@zix/core/auth';

export type ChatProviderProps = {
  children: React.ReactNode;
};

const client = ZixChat.getInstance();

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  ...props
}) => {
  const { profile } = useUser();
  React.useEffect(() => {
    if (profile) {
      client.connectUser(profile);
    }
  }, [profile]);
  return (
    <OverlayProvider>
      <Chat client={client}>
        <AppOverlayProvider>
          <UserSearchProvider>{children}</UserSearchProvider>
        </AppOverlayProvider>
      </Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
