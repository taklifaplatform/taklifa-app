import { ChannelLayout, ThreadScreen } from '@zix/app/features/chat';
import React from 'react';

export default function Screen() {
  return (
    <ChannelLayout>{(props) => <ThreadScreen {...props} />}</ChannelLayout>
  );
}
