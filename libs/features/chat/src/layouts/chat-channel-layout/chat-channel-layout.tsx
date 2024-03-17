import React from 'react';

export type ChatChannelLayoutProps = {
  children: React.ReactNode;
};

/**
 * Renders the layout for a chat channel.
 * @param children - The child components to render within the channel layout.
 */
export const ChatChannelLayout: React.FC<ChatChannelLayoutProps> = ({ children }) => {
  return children;
};

export default ChatChannelLayout;
