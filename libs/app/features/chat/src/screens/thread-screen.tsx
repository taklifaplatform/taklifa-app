import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Channel as StreamChatChannel } from 'stream-chat';
import {
  Channel,
  Thread,
  ThreadContextValue,
  useAttachmentPickerContext,
  useTheme,
  useTypingString
} from 'stream-chat-expo';

import { ScreenHeader } from '../src/components/ScreenHeader';

import type { StreamChatGenerics } from '../src/types';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

type ThreadScreenProps = {
  channel: StreamChatChannel<StreamChatGenerics>;
  thread?: any; // TODO: Fix type
};

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

export const ThreadScreen: React.FC<ThreadScreenProps> = ({
  channel,
  thread
}) => {
  const {
    theme: {
      colors: { white }
    }
  } = useTheme();
  const { setSelectedImages } = useAttachmentPickerContext();

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
