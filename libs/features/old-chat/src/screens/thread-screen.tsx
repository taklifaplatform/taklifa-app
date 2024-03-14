import { View } from 'tamagui';
import React, { useEffect } from 'react';
import {
  Channel,
  Thread,
  ThreadContextValue,
  useAttachmentPickerContext,
  useChannelContext,
  useThreadContext,
  useTypingString,
} from 'stream-chat-expo';
import { ScreenHeader } from '../components';
import { StreamChatGenerics } from '../types';

export type ThreadHeaderProps = {
  thread: ThreadContextValue<StreamChatGenerics>['thread'];
};

const ThreadHeader: React.FC<ThreadHeaderProps> = ({ thread }) => {
  const typing = useTypingString();

  return (
    <ScreenHeader
      subtitleText={typing ? typing : `with ${thread?.user?.name}`}
      titleText="Thread Reply"
    />
  );
};

export const ThreadScreen: React.FC = () => {
  const { setSelectedImages } = useAttachmentPickerContext();
  const { channel } = useChannelContext();
  const { thread } = useThreadContext();

  useEffect(() => {
    setSelectedImages([]);
    return () => setSelectedImages([]);
  }, []);

  return (
    <Channel<StreamChatGenerics>
      channel={channel}
      enforceUniqueReaction
      // keyboardVerticalOffset={0}
      thread={thread}
      threadList
    >
      <View flex={1}>
        <ThreadHeader thread={thread} />
        <Thread<StreamChatGenerics> />
      </View>
    </Channel>
  );
};
