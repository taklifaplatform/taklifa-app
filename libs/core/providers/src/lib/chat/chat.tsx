import React from 'react';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { ZixChat } from '@zix/core/chat';
import { useUser } from '@zix/core/auth';

export type ChatProviderProps = {
  children: React.ReactNode;
};

const client = ZixChat.getInstance();

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamxhaGV5In0.sUGnVd7E7bhs4HQTDyTKMnSA2YszXlgkrs2OnaMUQSQ';

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
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
