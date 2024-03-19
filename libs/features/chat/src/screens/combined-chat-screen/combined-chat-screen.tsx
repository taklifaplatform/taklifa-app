


import { AppHeader } from '@zix/ui/layouts';
import { useEffect, useState } from 'react';
import { Channel, ChannelHeader, ChannelList, MessageInput, Thread, VirtualizedMessageList, useChatContext } from 'stream-chat-react';
import { View, XStack } from 'tamagui';
import { createParam } from 'solito';
import type { Channel as StreamChatChannelLayout } from 'stream-chat';
import {
  DefaultGenerics
} from 'stream-chat/src/types';

const { useParam } = createParam<{
  channel: string;
  message?: string;
}>();


export const CombinedChatScreen = () => {
  const [channelId] = useParam('channel');

  const { client } = useChatContext()

  const [channel, setChannel] = useState<
    StreamChatChannelLayout<DefaultGenerics> | undefined
  >(); useEffect(() => {
    const initChannel = async () => {
      if (!client || !channelId || !client.userID) return;
      alert(channelId)

      // const newChannel = client?.channel('messaging', channelId);
      // if (!newChannel?.initialized) {
      //   await newChannel?.watch();
      // }
      // setChannel(newChannel);
    };

    initChannel();
  }, [channelId, client]);
  const renderChatUI = () => (!!client?.userID) && (
    <XStack flex={1} alignItems='stretch'>
      <View minWidth={300}>
        <ChannelList />
      </View>
      <View flex={1}>
        <Channel channel={channel}>
          <View flex={1}>
            <View bg='blue'>
              <ChannelHeader />
            </View>
            <View flex={1}>
              <VirtualizedMessageList />
            </View>
            <View bg='red'>
              <MessageInput />
            </View>
          </View>
          <Thread />
        </Channel>

      </View>

    </XStack>
  )

  return (
    <>
      <AppHeader
        title="Chat"
      />

      {renderChatUI()}
    </>
  );
}


export default CombinedChatScreen;
