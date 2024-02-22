import { useUser } from '@zix/core/auth';
import {
  AppOverlayProvider,
  UserSearchProvider
} from '@zix/core/chat';
import React from 'react';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { StreamChat } from './CustomChat';
export type ChatProviderProps = {
  children: React.ReactNode;
};

const client = StreamChat.getInstance('are', 'zer', {
  baseURL: 'http://0.0.0.0:8000/api/chat',
  logger: (logLevel, msg, extraData) => {
    console.log('====================');
    console.log('StreamChat::', msg);
    console.log('====================');
  }
});
// const client = ZixChat.getInstance();

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  ...props
}) => {
  const { user, profile } = useUser();
  async function initClient() {
    if (!user?.id) {
      return;
    }
    await client.connectUser({
      id: user.id,
      name: profile?.name,
      image: profile?.avatar_url,

    });
  }
  React.useEffect(() => {
    if (user && profile) {

      initClient();
    } else {
      client.disconnectUser()
    }
  }, [user, profile]);

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
