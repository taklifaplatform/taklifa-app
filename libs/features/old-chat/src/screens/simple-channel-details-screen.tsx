import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useChannelContext, useChatContext, useTheme } from 'stream-chat-expo';

import {
  Bell,
  ChevronRight,
  ImageDown,
  MessageCircleOff,
  Trash2,
  Undo2,
} from '@tamagui/lucide-icons';

import { useRouter } from 'solito/router';
import { useAppOverlayContext, useBottomSheetOverlayContext } from '../context';
import { getUserActivityStatus } from '../utils';

const styles = StyleSheet.create({
  actionContainer: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  actionLabelContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: 36,
    height: 72,
    width: 72,
  },
  backButton: {
    left: 0,
    paddingLeft: 16,
    position: 'absolute',
    top: 0,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  displayName: {
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 16,
  },
  itemText: {
    fontSize: 14,
    paddingLeft: 16,
  },
  onlineIndicator: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  onlineStatus: {
    fontSize: 12,
    paddingLeft: 8,
  },
  onlineStatusContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 16,
    paddingTop: 8,
  },
  spacer: {
    height: 8,
  },
  userInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  userName: {
    fontSize: 14,
  },
  userNameContainer: {
    alignSelf: 'stretch',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});

const Spacer = () => {
  const {
    theme: {
      colors: { grey_gainsboro },
    },
  } = useTheme();
  return (
    <View
      style={[
        styles.spacer,
        {
          backgroundColor: grey_gainsboro,
        },
      ]}
    />
  );
};

export const SimpleChannelDetailsScreen: React.FC = () => {
  const {
    theme: {
      colors: {
        accent_green,
        accent_red,
        black,
        border,
        grey,
        white,
        white_smoke,
      },
    },
  } = useTheme();
  const router = useRouter();
  const { channel } = useChannelContext();
  const { client: chatClient } = useChatContext();
  const { setOverlay } = useAppOverlayContext();
  const { setData } = useBottomSheetOverlayContext();

  const member = Object.values(channel.state.members).find(
    (channelMember) => channelMember.user?.id !== chatClient?.user?.id,
  );

  const user = member?.user;
  const [muted, setMuted] = useState(
    chatClient?.mutedUsers &&
      chatClient?.mutedUsers?.findIndex(
        (mutedUser) => mutedUser.target.id === user?.id,
      ) > -1,
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    chatClient?.mutedChannels &&
      chatClient.mutedChannels.findIndex(
        (mutedChannel) => mutedChannel.channel?.id === channel.id,
      ) > -1,
  );

  /**
   * Opens confirmation sheet for deleting the conversation
   */
  const openDeleteConversationConfirmationSheet = () => {
    if (!chatClient?.user?.id) return;
    setData({
      confirmText: 'DELETE',
      onConfirm: deleteConversation,
      subtext: 'Are you sure you want to delete this conversation?',
      title: 'Delete Conversation',
    });
    setOverlay('confirmation');
  };

  /**
   * Leave the group/channel
   */
  const deleteConversation = async () => {
    await channel.delete();
    setOverlay('none');
    router.replace('/chat');
  };

  if (!user) return null;

  return (
    <SafeAreaView style={[{ backgroundColor: white }, styles.container]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: user.image }} style={styles.avatar} />
          <Text
            style={[
              styles.displayName,
              {
                color: black,
              },
            ]}
          >
            {user.name}
          </Text>
          <View style={styles.onlineStatusContainer}>
            {user.online && (
              <View
                style={[
                  { backgroundColor: accent_green },
                  styles.onlineIndicator,
                ]}
              />
            )}
            <Text
              style={[
                styles.onlineStatus,
                {
                  color: black,
                },
              ]}
            >
              {user?.online ? 'Online' : getUserActivityStatus(user)}
            </Text>
          </View>
          <View
            style={[
              styles.userNameContainer,
              {
                borderTopColor: border,
              },
            ]}
          >
            {/* <Text
              style={[
                styles.userName,
                {
                  color: black
                }
              ]}
            >
              @{user.id}
            </Text> */}
            <Text
              style={[
                styles.userName,
                {
                  color: grey,
                },
              ]}
            >
              {user.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            style={styles.backButton}
          >
            <Undo2 height={24} width={24} />
          </TouchableOpacity>
        </View>
        <Spacer />
        <TouchableOpacity
          style={[
            styles.actionContainer,
            {
              borderBottomColor: border,
            },
          ]}
        >
          <View style={styles.actionLabelContainer}>
            <Bell height={24} width={24} />
            <Text
              style={[
                styles.itemText,
                {
                  color: black,
                },
              ]}
            >
              Notifications
            </Text>
          </View>
          <View>
            <Switch
              onValueChange={async () => {
                if (notificationsEnabled) {
                  await channel.unmute();
                } else {
                  await channel.mute();
                }
                setNotificationsEnabled((previousState) => !previousState);
              }}
              trackColor={{
                false: white_smoke,
                true: accent_green,
              }}
              value={notificationsEnabled}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionContainer,
            {
              borderBottomColor: border,
            },
          ]}
        >
          <View style={styles.actionLabelContainer}>
            <MessageCircleOff height={24} width={24} />
            <Text
              style={[
                styles.itemText,
                {
                  color: black,
                },
              ]}
            >
              Mute user
            </Text>
          </View>
          <View>
            <Switch
              onValueChange={async () => {
                if (muted) {
                  const r = await chatClient?.unmuteUser(user.id);
                  console.warn(r);
                } else {
                  const r = await chatClient?.muteUser(user.id);
                  console.warn(r);
                }
                setMuted((previousState) => !previousState);
              }}
              trackColor={{
                false: white_smoke,
                true: accent_green,
              }}
              value={muted}
            />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            router.push(`/chat/channels/${channel.id}/pinned-messages`);
          }}
          style={[
            styles.actionContainer,
            {
              borderBottomColor: border
            }
          ]}
        >
          <View style={styles.actionLabelContainer}>
            <Pin />
            <Text
              style={[
                styles.itemText,
                {
                  color: black
                }
              ]}
            >
              Pinned Messages
            </Text>
          </View>
          <View>
            <ChevronRight />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            router.push(`/chat/channels/${channel.id}/images`);
          }}
          style={[
            styles.actionContainer,
            {
              borderBottomColor: border,
            },
          ]}
        >
          <View style={styles.actionLabelContainer}>
            <ImageDown />
            <Text
              style={[
                styles.itemText,
                {
                  color: black,
                },
              ]}
            >
              Photos and Videos
            </Text>
          </View>
          <View>
            <ChevronRight />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            router.push(`/chat/channels/${channel.id}/files`);
          }}
          style={[
            styles.actionContainer,
            {
              borderBottomColor: border
            }
          ]}
        >
          <View style={styles.actionLabelContainer}>
            <Files />
            <Text
              style={[
                styles.itemText,
                {
                  color: black
                }
              ]}
            >
              Files
            </Text>
          </View>
          <View>
            <ChevronRight />
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => {
            router.push(
              `/chat/channels/${channel.id}/users/${user.id}/shared-groups`
            );
          }}
          style={[
            styles.actionContainer,
            {
              borderBottomColor: border
            }
          ]}
        >
          <View style={styles.actionLabelContainer}>
            <Contact />
            <Text
              style={[
                styles.itemText,
                {
                  color: black
                }
              ]}
            >
              Shared Groups
            </Text>
          </View>
          <View>
            <ChevronRight />
          </View>
        </TouchableOpacity> */}
        <Spacer />
        <TouchableOpacity
          onPress={openDeleteConversationConfirmationSheet}
          style={[
            styles.actionContainer,
            {
              borderBottomColor: border,
            },
          ]}
        >
          <View style={styles.actionLabelContainer}>
            <Trash2 color={accent_red} height={24} width={24} />
            <Text
              style={[
                styles.itemText,
                {
                  color: accent_red,
                },
              ]}
            >
              Delete contact
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SimpleChannelDetailsScreen;
