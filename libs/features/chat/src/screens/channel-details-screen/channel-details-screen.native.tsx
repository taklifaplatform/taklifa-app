
import { useMemo, useState } from 'react';

import { Check, ImagePlus, MessageCircle, MessageCircleOff, UserX } from '@tamagui/lucide-icons';
import { UserAvatar } from '@zix/ui/common';
import { useChannelContext, useChatContext } from 'stream-chat-expo';
import { Avatar, Button, ListItem, ScrollView, View, YGroup } from 'tamagui';
import ChannelHeader from '../../components/channel-header/channel-header';
import { CustomIcon } from '@zix/ui/icons';
import { ZixFieldContainer, ZixInput } from '@zix/ui/forms';
import { useRouter } from 'solito/router';
import { Alert } from 'react-native';
import { useAuth } from '@zix/services/auth';

const MEMBERS_LIST_LIMIT = 3;

export function ChannelDetailsScreen() {
  const router = useRouter()
  const { channel } = useChannelContext();
  const { client } = useChatContext();
  const { redirectUserToActiveDashboard, getUrlPrefix } = useAuth()

  const [muted, setMuted] = useState(
    client?.mutedChannels.some((mute) => mute.channel?.id === channel?.id),
  );
  const [groupName, setGroupName] = useState(channel.data?.name);

  const [showAllMembers, setShowAllMembers] = useState(false)
  const [search, setSearch] = useState<string>()
  const allMembers = Object.values(channel.state.members);

  const members = useMemo(() => {
    return allMembers.filter((member) => {
      if (search?.length) {
        return member?.user?.name?.toLocaleLowerCase().includes(search.toLowerCase())
      }
      return true
    }).slice(0, (showAllMembers) ? allMembers.length : MEMBERS_LIST_LIMIT)
  }, [allMembers, search, showAllMembers])

  /**
   * Leave the group/channel
   */
  const leaveGroup = async () => {
    if (client?.user?.id) {
      await channel.removeMembers([client?.user?.id]);
    }
    redirectUserToActiveDashboard()
  };

  return (
    <>
      <ChannelHeader
        showSearchBar
        searchProps={{
          value: search,
          onChangeText: (value) => setSearch(value),
          onFocus: () => setShowAllMembers(true),
          onBlur: () => setShowAllMembers(false),
        }}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        backgroundColor='$color1'
      >
        <YGroup marginBottom="$4">
          <YGroup.Item>
            {
              members?.map((member, index) => (
                <ListItem
                  borderBottomColor='$gray5'
                  borderBottomWidth={1}
                  key={`${member.user?.id}-${index}`}
                  title={member.user?.name}
                  subTitle={member.user?.online || member.role}
                  icon={(
                    <UserAvatar size='$3' user={member.user} />
                  )}
                />
              ))
            }
          </YGroup.Item>

          {
            allMembers?.length !== members.length && (
              <Button
                margin='$2'
                variant='outlined'
                onPress={() => {
                  setShowAllMembers(true)
                  setSearch('')
                }}
              >
                View More Members
              </Button>
            )
          }

          <View
            height='$0.5'
            backgroundColor='$gray5'
          />

          <ZixFieldContainer
            stackContainerProps={{
              paddingHorizontal: '$4',
              paddingBottom: '$4'
            }}
            label='Name'
            labelBold
          >
            <ZixInput
              value={groupName}
              onChangeText={setGroupName}
              rightIcon={() => (
                <Check />
              )}
              onRightIconPress={async () => {
                await channel.update({
                  ...channel.data,
                  name: groupName,
                })
              }}
            />
          </ZixFieldContainer>

          <View
            height='$0.5'
            backgroundColor='$gray5'
          />
          <YGroup.Item>
            <ListItem
              title='Mute Group'
              subTitle='Disable Notification for this group'
              onPress={async () => {
                if (muted) {
                  await channel.unmute();
                } else {
                  await channel.mute();
                }

                setMuted((previousState) => !previousState);
              }}

              borderBottomColor='$gray5'
              borderBottomWidth={1}
              icon={(
                <Avatar
                  size="$4"
                  circular
                  backgroundColor="$gray5"
                  alignItems="center"
                  justifyContent="center"
                >
                  {
                    muted ? (
                      <MessageCircle size="$2" />
                    ) : (
                      <MessageCircleOff size="$2" />
                    )
                  }
                </Avatar>
              )}
            />

            <ListItem
              title='Photos and Videos'
              subTitle='View all shared photos and videos in this group'
              onPress={async () => {
                router.push(`${getUrlPrefix}/chat/channels/${channel.id}/images`);
              }}

              borderBottomColor='$gray5'
              borderBottomWidth={1}
              icon={(
                <Avatar
                  size="$4"
                  circular
                  backgroundColor="$gray5"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ImagePlus size="$2" />
                </Avatar>
              )}
              iconAfter={
                <CustomIcon name='chevron_right' size="$2" />
              }
            />

            <ListItem
              title='Leave Group'
              subTitle='Leave Chat Group'
              onPress={async () => {
                Alert.alert(
                  'Leave Group',
                  `Are you sure you want to leave the group ${groupName || ''}?`,
                  [
                    {
                      text: 'Leave',
                      onPress: () => leaveGroup(),
                      style: 'cancel',
                    },
                    {
                      text: 'Cancel',
                      style: 'destructive',
                    },
                  ]
                )
              }}

              borderBottomColor='$gray5'
              borderBottomWidth={1}
              icon={(
                <Avatar
                  size="$4"
                  circular
                  backgroundColor="$gray5"
                  alignItems="center"
                  justifyContent="center"
                >
                  <UserX size="$2" />
                </Avatar>
              )}
            />
          </YGroup.Item>
        </YGroup>
      </ScrollView>
    </>
  );
}

export default ChannelDetailsScreen;
