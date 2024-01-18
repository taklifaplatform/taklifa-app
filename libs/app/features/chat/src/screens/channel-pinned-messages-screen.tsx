import { createParam } from 'solito';

import type { Channel as StreamChatChannel } from 'stream-chat';

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useChatContext, useTheme } from 'stream-chat-expo';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageSearchList } from '../src/components/MessageSearch/MessageSearchList';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { usePaginatedPinnedMessages } from '../src/hooks/usePaginatedPinnedMessages';
import { Message } from '../src/icons/Message';
import type { StreamChatGenerics } from '../src/types';

import type { RouteProp } from '@react-navigation/native';

import type { StackNavigatorParamList } from '../src/types';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  details: {
    flex: 1,
    paddingLeft: 16
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  flex: {
    flex: 1
  },
  noFiles: {
    fontSize: 16,
    paddingBottom: 8
  },
  noFilesDetails: {
    fontSize: 14,
    textAlign: 'center'
  },
  sectionContainer: {
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  sectionContentContainer: {
    flexGrow: 1
  },
  sectionTitle: {
    fontSize: 14
  },
  size: {
    fontSize: 12
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    paddingBottom: 2
  }
});

type ChannelPinnedMessagesScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  'ChannelFilesScreen'
>;

export type ChannelPinnedMessagesScreenProps = {
  route: ChannelPinnedMessagesScreenRouteProp;
};
const { useParam } = createParam<{ channel: string }>();

export const ChannelPinnedMessagesScreen: React.FC = () => {
  const {
    theme: {
      colors: { white_snow }
    }
  } = useTheme();
  const { client: chatClient } = useChatContext();

  const [channelId] = useParam('channel');
  const [channel, setChannel] = useState<
    StreamChatChannel<StreamChatGenerics> | undefined
  >();

  useEffect(() => {
    const initChannel = async () => {
      if (!chatClient || !channelId) return;

      const newChannel = chatClient?.channel('messaging', channelId);
      if (!newChannel?.initialized) {
        await newChannel?.watch();
      }
      setChannel(newChannel);
    };

    initChannel();
  }, [channelId, chatClient]);
  const { loading, loadMore, messages } = usePaginatedPinnedMessages(channel);
  const insets = useSafeAreaInsets();

  if (!channel || !chatClient) return null;

  return (
    <View
      style={[
        styles.flex,
        {
          backgroundColor: white_snow,
          paddingBottom: insets.bottom
        }
      ]}
    >
      <ScreenHeader titleText="Pinned Messages" />
      <MessageSearchList
        EmptySearchIndicator={EmptyListComponent}
        loading={loading}
        loadMore={loadMore}
        messages={messages}
      />
    </View>
  );
};

const EmptyListComponent = () => {
  const {
    theme: {
      colors: { black, grey, grey_gainsboro }
    }
  } = useTheme();
  return (
    <View style={styles.emptyContainer}>
      <Message fill={grey_gainsboro} height={110} width={130} />
      <Text style={[styles.noFiles, { color: black }]}>No pinned messages</Text>
      <Text style={[styles.noFilesDetails, { color: grey }]}>
        Long-press an important message and choose Pin to conversation.
      </Text>
    </View>
  );
};
