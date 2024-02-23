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
  const { user } = useUser();
  async function initClient() {
    if (!user?.id) {
      return;
    }
    await client.connectUser({
      user
    });
  }
  React.useEffect(() => {
    if (user) {

      initClient();
    } else {
      client.disconnectUser()
    }
  }, [user]);

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
