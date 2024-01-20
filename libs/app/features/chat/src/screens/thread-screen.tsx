import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Channel,
  Thread,
  ThreadContextValue,
  useAttachmentPickerContext,
  useChannelContext,
  useTheme,
  useThreadContext,
  useTypingString
} from 'stream-chat-expo';

import { ScreenHeader } from '@zix/core/chat';

import type { StreamChatGenerics } from '@zix/core/chat';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export type ThreadHeaderProps = {
  thread: ThreadContextValue<StreamChatGenerics>['thread'];
};

const ThreadHeader: React.FC<ThreadHeaderProps> = ({ thread }) => {
  const typing = useTypingString();

  return (
    <ScreenHeader
      inSafeArea
      subtitleText={typing ? typing : `with ${thread?.user?.name}`}
      titleText="Thread Reply"
    />
  );
};

export const ThreadScreen: React.FC = () => {
  const {
    theme: {
      colors: { white }
    }
  } = useTheme();
  const { setSelectedImages } = useAttachmentPickerContext();
  const { channel } = useChannelContext();
  const { thread } = useThreadContext();

  useEffect(() => {
    setSelectedImages([]);
    return () => setSelectedImages([]);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: white }]}>
      <Channel<StreamChatGenerics>
        channel={channel}
        enforceUniqueReaction
        keyboardVerticalOffset={0}
        thread={thread}
        threadList
      >
        <View style={styles.container}>
          <ThreadHeader thread={thread} />
          <Thread<StreamChatGenerics> />
        </View>
      </Channel>
    </SafeAreaView>
  );
};
