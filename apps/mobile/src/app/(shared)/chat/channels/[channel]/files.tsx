import { ChannelFilesScreen, ChannelLayout } from '@zix/app/features/chat';
import React from 'react';

export default function Screen() {
  return (
    <ChannelLayout>
      {({ channel }) => <ChannelFilesScreen channel={channel} />}
    </ChannelLayout>
  );
}
