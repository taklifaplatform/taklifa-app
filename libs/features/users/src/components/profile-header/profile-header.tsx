import { DriverTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { getLastActivityStatus } from '@zix/utils';
import React, { useMemo } from 'react';
import { H4, H6, Text, XStack, YStack, View } from 'tamagui';

export type ProfileHeaderProps = {
  user: DriverTransformer;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const activityStatus = useMemo(() => getLastActivityStatus(user), [user])

  return (
    <YStack gap="$2">
      <XStack gap="$2" justifyContent="center" $sm={{ marginTop: '$4' }}>
        <UserAvatar user={user} size="$9" />
      </XStack>
      <YStack gap="$2">
        {!!user.name && <H4 textAlign="center">{user.name}</H4>}
        <H6 textAlign="center" color="$color10">@{user.username}</H6>
        <XStack alignContent='center' gap="$2" justifyContent='center'>
          <View height='$1' width='$1' borderRadius='$8' backgroundColor={activityStatus.color} />
          <Text fontWeight="bold" color="$color8">
            {activityStatus.text}
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default ProfileHeader;
