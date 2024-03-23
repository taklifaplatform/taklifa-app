import { useAuth } from '@zix/services/auth';
import { AppHeader } from '@zix/ui/layouts';
import { useCallback } from 'react';
import { useRouter } from 'solito/router';
import { ChannelList } from 'stream-chat-expo';

export function ChannelsListScreen() {
  const { getUrlPrefix } = useAuth()
  const router = useRouter()

  const onSelect = useCallback((channel: any) => {
    router.push(`${getUrlPrefix}/chat/channels/${channel.id}`);
  }, [router, getUrlPrefix])

  return (
    <>
      <AppHeader showBackButton title='Chat' />
      <ChannelList
        onSelect={onSelect}
      />
    </>
  );
}


export default ChannelsListScreen;
