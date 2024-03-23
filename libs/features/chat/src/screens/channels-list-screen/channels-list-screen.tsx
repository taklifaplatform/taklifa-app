

import { AppHeader } from '@zix/ui/layouts';
import { ChannelList } from 'stream-chat-react';




export function ChannelsListScreen() {
  return (
    <>
      <AppHeader title='Chat' />
      <ChannelList />
    </>
  );
}


export default ChannelsListScreen;
