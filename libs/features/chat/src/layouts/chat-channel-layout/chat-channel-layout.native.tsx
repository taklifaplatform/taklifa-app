import React, { useEffect, useState } from 'react';
import { createParam } from 'solito';
import type { Channel as StreamChatChannelLayout } from 'stream-chat';
import { Channel, useChatContext } from 'stream-chat-expo';

import {
  DefaultGenerics
} from 'stream-chat/src/types';

const { useParam } = createParam<{
  channel: string;
  message?: string;
}>();

export type ChatChannelLayoutProps = {
  children: React.ReactNode;
};

/**
 * Renders the layout for a chat channel.
 * @param children - The child components to render within the channel layout.
 */
export const ChatChannelLayout: React.FC<ChatChannelLayoutProps> = ({ children }) => {
  const [channelId] = useParam('channel');
  const { client } = useChatContext();

  const [channel, setChannel] = useState<
    StreamChatChannelLayout<DefaultGenerics> | undefined
  >();

  useEffect(() => {
    const initChannel = async () => {
      if (!client || !channelId) return;

      const newChannel = client?.channel('messaging', channelId);
      if (!newChannel?.initialized) {
        await newChannel?.watch();
      }
      setChannel(newChannel);
    };

    initChannel();
  }, [channelId, client]);

  if (!channel || !client) return null;

  return <Channel channel={channel}>{children}</Channel>;
};

export default ChatChannelLayout;
