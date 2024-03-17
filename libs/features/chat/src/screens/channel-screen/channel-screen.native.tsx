

import { MessageInput, MessageList, useChannelContext } from 'stream-chat-expo';
import ChannelHeader from '../../components/channel-header/channel-header';
import { useRouter } from 'solito/router';

export function ChannelScreen() {
  const router = useRouter();
  const { channel } = useChannelContext();

  return (
    <>
      <ChannelHeader />
      <MessageList
        onThreadSelect={(thread) => {
          router.push(`/chat/channels/${channel.id}/threads/${thread?.id}`);
        }}
      />
      <MessageInput />
    </>
  );
}

export default ChannelScreen;
