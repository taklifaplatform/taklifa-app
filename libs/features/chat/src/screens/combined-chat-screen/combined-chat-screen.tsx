


import { AppHeader } from '@zix/ui/layouts';
import { Channel, ChannelHeader, ChannelList, MessageInput, Thread, VirtualizedMessageList, useChatContext } from 'stream-chat-react';
import { View, XStack } from 'tamagui';

export const CombinedChatScreen = () => {
  const { client } = useChatContext()

  const renderChatUI = () => (!!client?.userID) && (
    <XStack flex={1} alignItems='stretch'>
      <View minWidth={300}>
        <ChannelList />
      </View>
      <View flex={1}>
        <Channel>
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
