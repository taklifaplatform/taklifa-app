

import { MessageInput, MessageList } from 'stream-chat-expo';
import ChannelHeader from '../../components/channel-header/channel-header';

/* eslint-disable-next-line */
export interface ChannelScreenProps {
}


export function ChannelScreen(props: ChannelScreenProps) {
  return (
    <>
      <ChannelHeader />
      <MessageList />
      <MessageInput />
    </>
  );
}


export default ChannelScreen;
