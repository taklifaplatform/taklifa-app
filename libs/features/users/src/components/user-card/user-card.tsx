import { X } from '@tamagui/lucide-icons';
import { DriverTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { useMemo } from 'react';
import { useRouter } from 'solito/router';
import { Button, Image, Separator, Text, ThemeableStackProps, XStack, YStack } from 'tamagui';
import { UserContactActions } from '../user-contact-actions/user-contact-actions';
import { UserInfoRow } from '../user-info-row/user-info-row';
import { VehicleImagesRow } from '../vehicle-images-row/vehicle-images-row';

export type UserCardProps = ThemeableStackProps & {
  user: DriverTransformer;
  onClose?: () => void;
};

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onClose,
  padding = '$4',
  ...props
}) => {
  const router = useRouter();

  const activeCompany = useMemo(() => {
    return user?.companies?.filter((company) => company?.logo?.url).shift();
  }, [user?.companies]);

  function onPress() {
    router.push(`/users/${user.id}`);
  }

  const renderCloseButton = () =>
    onClose && (
      <Button
        position="absolute"
        top='$4'
        right='$4'
        backgroundColor={'$gray6'}
        width={34}
        size={'$3'}
        borderRadius={'$5'}
        icon={<X size="$1" />}
        onPress={() => onClose()}
      />
    );

  return (
    <YStack
      onPress={onPress}
      backgroundColor='$color2'
      borderRadius='$5'
      paddingVertical={padding}
      gap="$4"
      justifyContent='space-between'
      {...props}
    >
      <XStack justifyContent="space-between" paddingHorizontal={padding} alignItems="center">
        <XStack alignItems="center" gap="$2">
          <UserAvatar user={user} size="$5" />
          <YStack alignItems="flex-start">
            <Text color={'$black'} fontWeight="bold">
              {user?.name}
            </Text>
            <Text color={'$gray10'}>متواجد الان</Text>
          </YStack>
        </XStack>
        {renderCloseButton()}
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

      <UserInfoRow user={user} paddingHorizontal={padding} />
      <VehicleImagesRow medias={user?.vehicle?.images || []} paddingHorizontal={padding} />
      <Separator borderColor="$gray6" />
      <UserContactActions user={user} paddingHorizontal={padding} />
    </YStack>
  );
};

export default UserCard;
