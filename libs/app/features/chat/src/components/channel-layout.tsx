import React, { useEffect, useState } from 'react';
import { createParam } from 'solito';
import type { Channel as StreamChatChannel } from 'stream-chat';
import { Channel, useChatContext } from 'stream-chat-expo';
import type { StreamChatGenerics } from '../src/types';

const { useParam } = createParam<{ channel: string; message?: string }>();

export type ChannelLayoutProps = {
  children: React.ReactNode;
};

/**
 * Renders the layout for a chat channel.
 * @param children - The child components to render within the channel layout.
 */
export const ChannelLayout: React.FC<ChannelLayoutProps> = ({ children }) => {
  const [channelId] = useParam('channel');
  const { client } = useChatContext();

  const [channel, setChannel] = useState<
    StreamChatChannel<StreamChatGenerics> | undefined
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

export default ChannelLayout;
