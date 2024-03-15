
import React from 'react';

import { AppHeader, UserAvatar } from '@zix/ui/common';
import { Channel, Thread, ThreadContextValue, useChannelContext, useThreadContext, useTypingString } from 'stream-chat-expo';
import { H4, Text, View, YStack } from 'tamagui';

export function ChannelThreadScreen() {
  const { channel } = useChannelContext();
  const { thread } = useThreadContext();

  return (
    <Channel
      channel={channel}
      enforceUniqueReaction
      // keyboardVerticalOffset={0}
      thread={thread}
      threadList
    >
      <View flex={1}>
        <ThreadHeader thread={thread} />
        <Thread />
      </View>
    </Channel>
  );
}



export type ThreadHeaderProps = {
  thread: ThreadContextValue['thread'];
};
const ThreadHeader: React.FC<ThreadHeaderProps> = ({ thread }) => {
  const typing = useTypingString();

  return (
    <AppHeader
      showBackButton
      headerTitle={() => (
        <YStack alignItems='center'>
          <H4 fontSize='$1.5' numberOfLines={1}>
            Thread Reply
          </H4>
          <Text fontSize='$1' numberOfLines={1}>

            {typing ? typing : `with ${thread?.user?.name}`}
          </Text>
        </YStack>
      )}
      headerRight={() => (
        <UserAvatar
          user={thread?.user}
        />
      )}
    />
  );
};

export default ChannelThreadScreen;
