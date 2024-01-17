import { ChannelImagesScreen, ChannelLayout } from '@zix/app/features/chat';
import React from 'react';

export default function Screen() {
  return (
    <ChannelLayout>
      {({ channel }) => <ChannelImagesScreen channel={channel} />}
    </ChannelLayout>
  );
}
