import {
  ChannelLayout,
  GroupChannelDetailsScreen
} from '@zix/app/features/chat';
import React from 'react';

export default function Screen() {
  return (
    <ChannelLayout>
      {({ channel }) => <GroupChannelDetailsScreen channel={channel} />}
    </ChannelLayout>
  );
}
