import { AppHeader } from '@zix/ui/common';
import { useCallback } from 'react';
import { useRouter } from 'solito/router';
import { ChannelList } from 'stream-chat-expo';

export function ChannelsListScreen() {
  const router = useRouter()

  const onSelect = useCallback((channel: any) => {
    router.push(`/chat/channels/${channel.id}`);
  }, [router])

  return (
    <>
      <AppHeader showBackButton />
      <ChannelList
        onSelect={onSelect}
      />
    </>
  );
}


export default ChannelsListScreen;
