

import { MessageInput, MessageList, useChannelContext } from 'stream-chat-expo';
import ChannelHeader from '../../components/channel-header/channel-header';
import { useRouter } from 'solito/router';
import { useAuth } from '@zix/services/auth';

export function ChannelScreen() {
  const router = useRouter();
  const { getUrlPrefix } = useAuth()
  const { channel } = useChannelContext();

  return (
    <>
      <ChannelHeader />
      <MessageList
        onThreadSelect={(thread) => {
          router.push(`${getUrlPrefix}/chat/channels/${channel.id}/threads/${thread?.id}`);
        }}
      />
      <MessageInput />
    </>
  );
}

export default ChannelScreen;
