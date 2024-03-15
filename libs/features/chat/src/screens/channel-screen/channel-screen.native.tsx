

import { MessageInput, MessageList } from 'stream-chat-expo';
import ChannelHeader from '../../components/channel-header/channel-header';

export function ChannelScreen() {
  return (
    <>
      <ChannelHeader />
      <MessageList />
      <MessageInput />
    </>
  );
}

export default ChannelScreen;
