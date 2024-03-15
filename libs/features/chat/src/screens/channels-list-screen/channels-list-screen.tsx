

import { AppHeader } from '@zix/ui/common';
import { ChannelList } from 'stream-chat-react';




export function ChannelsListScreen() {
  return (
    <>
      <AppHeader
        headerBackgroundColor='transparent'
      />
      <ChannelList />
    </>
  );
}


export default ChannelsListScreen;
