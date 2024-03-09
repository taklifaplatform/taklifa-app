import { DriverTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import React from 'react';
import { H4, Text, XStack, YStack } from 'tamagui';

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
        <H4 textAlign="center">{user.name}</H4>
        <Text textAlign="center" fontWeight="bold" color="$gray10">
          Online now
        </Text>
      </YStack>
    </YStack>
  );
};

export default ProfileHeader;
