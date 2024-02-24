import React from 'react';

export type ChatProviderProps = {
  children: React.ReactNode;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  ...props
}) => {
  return children;
};

export default ChatProvider;
