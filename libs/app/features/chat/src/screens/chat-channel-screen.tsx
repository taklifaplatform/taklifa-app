import { createParam } from 'solito';

import { useFocusEffect } from '@react-navigation/native';
import { View } from '@zix/app/ui/core';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import {
  Channel,
  ChannelAvatar,
  MessageInput,
  MessageList,
  ThreadContextValue,
  useAttachmentPickerContext,
  useChannelContext,
  useChannelPreviewDisplayName,
  useChatContext,
  useTheme,
  useTypingString
} from 'stream-chat-expo';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { useChannelMembersStatus } from '../src/hooks/useChannelMembersStatus';

import { useSafeAreaInsets } from '@zix/core/utils';
import { useRouter } from 'solito/router';
import { NetworkDownIndicator } from '../src/components/NetworkDownIndicator';
import type { StreamChatGenerics } from '../src/types';

const ChannelHeader: React.FC = () => {
  const router = useRouter();
  const { channel } = useChannelContext();
  const { client: chatClient } = useChatContext();
  const { closePicker } = useAttachmentPickerContext();
  const membersStatus = useChannelMembersStatus(channel);
  const displayName = useChannelPreviewDisplayName(channel, 30);
  const { isOnline } = useChatContext();
  const typing = useTypingString();

  if (!channel || !chatClient) return null;

  const isOneOnOneConversation =
    channel &&
    Object.values(channel.state.members).length === 2 &&
    channel.id?.indexOf('!members-') === 0;

  return (
    <ScreenHeader
      onBack={router.back}
      RightContent={() => (
        <TouchableOpacity
          onPress={() => {
            closePicker();
            if (isOneOnOneConversation) {
              console.log(
                'navigate to OneOnOneChannelDetailScreen::',
                channel.id
              );
              // navigation.navigate('OneOnOneChannelDetailScreen', {
              //   channel,
              // })
            } else {
              console.log(
                'navigate to GroupChannelDetailsScreen::',
                channel.id
              );
              router.push(`/chat/channels/${channel.id}/details`);
            }
          }}
        >
          <ChannelAvatar channel={channel} />
        </TouchableOpacity>
      )}
      showUnreadCountBadge
      Subtitle={isOnline ? undefined : NetworkDownIndicator}
      subtitleText={typing ? typing : membersStatus}
      titleText={displayName}
    />
  );
};

const { useParam } = createParam<{ channel: string; message?: string }>();

export const ChatChannelScreen: React.F = () => {
  const { channel } = useChannelContext();
  const [messageId] = useParam('message');
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const {
    theme: {
      colors: { white }
    }
  } = useTheme();

  const [selectedThread, setSelectedThread] =
    useState<ThreadContextValue<StreamChatGenerics>['thread']>();

  useFocusEffect(() => {
    setSelectedThread(undefined);
  });

  return (
    <View flex={1} backgroundColor={white} paddingBottom={bottom}>
      <Channel
        channel={channel}
        // enforceUniqueReaction
        // initialScrollToFirstUnreadMessage
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -300}
        messageId={messageId}
        thread={selectedThread}
      >
        <ChannelHeader channel={channel} />
        <MessageList<StreamChatGenerics>
          onThreadSelect={(thread) => {
            setSelectedThread(thread);
            router.push(`/chat/channels/${channel.id}/threads/${thread?.id}`);
          }}
        />
        <MessageInput />
      </Channel>
    </View>
  );
};
