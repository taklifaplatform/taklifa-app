

import { AppHeader } from '@zix/ui/common';
import { useCallback } from 'react';
import { useRouter } from 'solito/router';
import { ChannelList } from 'stream-chat-expo';


export function ChannelsListScreen() {
  const router = useRouter()

  const onSelect = useCallback((channel: any) => {
    console.log('====================================')
    console.log('channel v2.2', channel?.id);
    console.log('====================================')
    // router.push(`/solo-driver`);
    router.push(`/chat/channels/${channel.id}`);
  }, [router])


  return (
    <>
      <AppHeader />
      <ChannelList
        onSelect={onSelect}

      />
    </>
  );
}


export default ChannelsListScreen;
