import { UserTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { UserAvatar } from '@zix/ui/common';
import { getLastActivityStatus } from '@zix/utils';
import React, { useMemo } from 'react';
import { useRouter } from 'solito/router';
import { Image, Text, ThemeableStackProps, XStack, YStack } from 'tamagui';
import { UserContactActions, UserContactActionsProps } from '../user-contact-actions/user-contact-actions';
import { UserInfoRow } from '../user-info-row/user-info-row';

export type UserCardProps = ThemeableStackProps & {
  user: UserTransformer;
  userContactActionsProps?: Partial<UserContactActionsProps>
  showContactActions?: boolean;
};

export const UserCard: React.FC<UserCardProps> = React.memo(({
  user,
  padding = '$4',
  userContactActionsProps = {},
  showContactActions = true,
  ...props
}) => {
  const router = useRouter();
  const activityStatus = useMemo(() => getLastActivityStatus(user), [user])
  const { isLoggedIn } = useAuth();


  const activeCompany = useMemo(() => {
    return user?.companies?.filter((company) => company?.logo?.url).shift();
  }, [user?.companies]);

  function onPress() {
    // AnalyticsService
    //   .storeUserAnalytic({
    //     user: user.id?.toString() || '',
    //     requestBody: {
    //       action_type: 'profile_view',
    //     }
    //   })
    router.push(`/app/users/${user.id}`);
  }

  return (
    <YStack
      onPress={onPress}
      backgroundColor='$color1'
      borderRadius='$5'
      paddingVertical={padding}
      gap="$4"
      justifyContent='space-between'
      {...props}
    >
      <XStack justifyContent="space-between" paddingHorizontal={padding} alignItems="center">
        <XStack alignItems="center" gap="$2" flex={1}>
          <UserAvatar user={user} size="$5" />
          <YStack alignItems="flex-start">
            <Text color='$color12' fontWeight="bold">
              {user?.name ?? user?.username ?? user?.phone}
            </Text>
            {activeCompany && (
              <Text color='$color11'>
                {activeCompany?.name}
              </Text>
            )}
            <Text color='$color10'>
              {activityStatus.text}
            </Text>
          </YStack>
        </XStack>
        <XStack alignItems='center' gap='$2'>
          {activeCompany && (
            <Image
              source={{
                uri: activeCompany?.logo?.original_url,
              }}
              width='$9'
              height='$4'
              resizeMode="cover"
            />
          )}
        </XStack>

      </XStack>

      <UserInfoRow user={user} paddingHorizontal={padding} />
      {showContactActions && <UserContactActions {...userContactActionsProps} user={user} paddingHorizontal={padding} useDestinationButton={false} />}
    </YStack>
  );
},
  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id
);

export default UserCard;
