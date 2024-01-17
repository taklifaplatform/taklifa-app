import { createParam } from 'solito';

import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Channel as StreamChatChannel } from 'stream-chat';
import {
  Channel,
  ChannelAvatar,
  MessageInput,
  MessageList,
  ThreadContextValue,
  useAttachmentPickerContext,
  useChannelPreviewDisplayName,
  useChatContext,
  useTheme,
  useTypingString
} from 'stream-chat-expo';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { useChannelMembersStatus } from '../src/hooks/useChannelMembersStatus';

import { useRouter } from 'solito/router';
import { useChatClient } from '../hooks/useChatClient';
import { NetworkDownIndicator } from '../src/components/NetworkDownIndicator';
import type { StreamChatGenerics } from '../src/types';

const styles = StyleSheet.create({
  flex: { flex: 1 }
});

export type ChannelScreenProps = {
  channelId?: string;
  messageId?: string;
};

export type ChannelHeaderProps = {
  channel: StreamChatChannel<StreamChatGenerics>;
};

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channel }) => {
  const router = useRouter();
  const { client: chatClient } = useChatClient();
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

export const ChatChannelScreen: React.FC<ChannelHeaderProps> = ({
  channel
}) => {
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
    <View
      style={[styles.flex, { backgroundColor: white, paddingBottom: bottom }]}
    >
      <Channel
        channel={channel}
        disableTypingIndicator
        enforceUniqueReaction
        initialScrollToFirstUnreadMessage
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -300}
        messageId={messageId}
        NetworkDownIndicator={() => null}
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
