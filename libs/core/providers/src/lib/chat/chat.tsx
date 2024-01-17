import React from 'react';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';

export type ChatProviderProps = {
  children: React.ReactNode;
};

const client = StreamChat.getInstance('e2yk5ayrht2m');

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamxhaGV5In0.sUGnVd7E7bhs4HQTDyTKMnSA2YszXlgkrs2OnaMUQSQ';

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
