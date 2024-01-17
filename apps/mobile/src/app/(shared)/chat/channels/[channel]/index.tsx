import { ChannelLayout, ChatChannelScreen } from '@zix/app/features/chat';
import React from 'react';

export default function Screen() {
  return (
    <ChannelLayout>
      {({ channel }) => <ChatChannelScreen channel={channel} />}
    </ChannelLayout>
  );
}
