import { DriverTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { ZixMediasListWidget } from '@zix/ui/widgets';
import { useMemo } from 'react';
import { useRouter } from 'solito/router';
import { Image, Separator, Text, ThemeableStackProps, XStack, YStack } from 'tamagui';
import { UserContactActions } from '../user-contact-actions/user-contact-actions';
import { UserInfoRow } from '../user-info-row/user-info-row';

export type UserCardProps = ThemeableStackProps & {
  user: DriverTransformer;
};

export const UserCard: React.FC<UserCardProps> = ({
  user,
  padding = '$4',
  ...props
}) => {
  const router = useRouter();

  const activeCompany = useMemo(() => {
    return user?.companies?.filter((company) => company?.logo?.url).shift();
  }, [user?.companies]);

  function onPress() {
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
              {user?.name}
            </Text>
            {activeCompany && (
              <Text color='$color11'>
                {activeCompany?.name}
              </Text>
            )}
            <Text color='$color10'>متواجد الان</Text>
          </YStack>
        </XStack>
        <XStack alignItems='center' gap='$2'>
          {activeCompany && (
            <Image
              source={{
                uri: activeCompany?.logo?.url,
              }}
              width={75}
              height={12}
              resizeMode="cover"
            />
          )}
        </XStack>

      </XStack>

      <UserInfoRow user={user} paddingHorizontal={padding} />
      <ZixMediasListWidget medias={user?.vehicle?.images || []} paddingHorizontal={padding} />
      <Separator borderColor="$gray6" />
      <UserContactActions user={user} paddingHorizontal={padding} />
    </YStack>
  );
};

export default UserCard;
