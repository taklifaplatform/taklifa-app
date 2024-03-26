import { DriverTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import React from 'react';
import { H4, H6, Text, XStack, YStack } from 'tamagui';

export type ProfileHeaderProps = {
  user: DriverTransformer;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <YStack gap="$2">
      <XStack gap="$2" justifyContent="center" $sm={{ marginTop: '$4' }}>
        <UserAvatar user={user} size="$9" />
      </XStack>
      <YStack gap="$2">
        <H4 textAlign="center">{user.name ?? 'N/A'}</H4>
        <H6 textAlign="center" color="$color10">@{user.username}</H6>
        <Text textAlign="center" fontWeight="bold" color="$color8">
          Online now
        </Text>
      </YStack>
    </YStack>
  );
};

export default ProfileHeader;
