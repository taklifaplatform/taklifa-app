import { View } from 'tamagui';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  ChannelAvatar,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
  useChannelContext,
  useChannelPreviewDisplayName,
  useChatContext,
  useTypingString,
} from 'stream-chat-expo';

import { useRouter } from 'solito/router';
import { NetworkDownIndicator, ScreenHeader } from '../components';
import { useChannelMembersStatus } from '../hooks';
import { StreamChatGenerics } from '../types';

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
                channel.id,
              );
              // navigation.navigate('OneOnOneChannelDetailScreen', {
              //   channel,
              // })
            } else {
              console.log(
                'navigate to GroupChannelDetailsScreen::',
                channel.id,
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

export const ChatChannelScreen: React.FC = () => {
  const { channel } = useChannelContext();
  const router = useRouter();

  return (
    <View flex={1}>
      <ChannelHeader />
      <MessageList<StreamChatGenerics>
        onThreadSelect={(thread) => {
          router.push(`/chat/channels/${channel.id}/threads/${thread?.id}`);
        }}
      />
      <MessageInput />
    </View>
  );
};
