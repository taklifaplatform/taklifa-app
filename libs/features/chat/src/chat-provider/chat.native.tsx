import React from 'react';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useChat } from './use-chat';
import { ChatProviderProps } from './chat';


export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  ...props
}) => {
  const { client ,i18nInstance} = useChat()

  return (
    <OverlayProvider>
      <Chat client={client} i18nInstance={i18nInstance} >
        {children}
        {/* <AppOverlayProvider>
          <UserSearchProvider>{children}</UserSearchProvider>
        </AppOverlayProvider> */}
      </Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
