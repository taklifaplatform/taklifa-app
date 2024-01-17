import React, { useEffect, useState } from 'react';
import { createParam } from 'solito';
import type { Channel as StreamChatChannel } from 'stream-chat';
import type { StreamChatGenerics } from '../src/types';
import { useChatClient } from '../hooks/useChatClient';

const { useParam } = createParam<{ channel: string; message?: string }>();

export type ChannelLayoutProps = {
  children: (props: {
    client: StreamChatGenerics['client'];
    channel: StreamChatChannel<StreamChatGenerics>;
  }) => React.ReactNode;
};

export const ChannelLayout: React.FC<ChannelLayoutProps> = ({ children }) => {
  const [channelId] = useParam('channel');
  const { client } = useChatClient();
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

  // TODO:: Add loading state
  if (!channel || !client) return null;

  return children({ client, channel });
};
