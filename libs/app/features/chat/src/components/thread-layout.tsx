import React, { useEffect, useState } from 'react';
import { createParam } from 'solito';
import type { Channel as StreamChatChannel } from 'stream-chat';
import { Channel, useChatContext } from 'stream-chat-expo';
import type { StreamChatGenerics } from '../src/types';

const { useParam } = createParam<{ channel: string; thread: string }>();

export type ThreadLayoutProps = {
  children: React.ReactNode;
};

/**
 * Renders the layout for a chat channel.
 * @param children - The child components to render within the channel layout.
 */
export const ThreadLayout: React.FC<ThreadLayoutProps> = ({ children }) => {
  const [channelId] = useParam('channel');
  const [threadId] = useParam('thread');
  const { client } = useChatContext();

  const [channel, setChannel] = useState<
    StreamChatChannel<StreamChatGenerics> | undefined
  >();

  useEffect(() => {
    const iniThread = async () => {
      if (!client || !channelId || !threadId) return;

      // const newChannel = client?.channel('messaging', channelId);
      // if (!newChannel?.initialized) {
      //   await newChannel?.watch();
      // }
      // setChannel(newChannel);
    };

    iniThread();
  }, [channelId, threadId, client]);

  if (!channel || !client) return null;

  return <Channel channel={channel}>{children}</Channel>;
};

export default ThreadLayout;
