import { X } from '@tamagui/lucide-icons';
import { DriverTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { useMemo } from 'react';
import { useRouter } from 'solito/router';
import { Button, Image, Text, View, XStack, YStack } from 'tamagui';
import { UserContactActions } from '../user-contact-actions/user-contact-actions';
import { UserInfoRow } from '../user-info-row/user-info-row';
import { VehicleImagesRow } from '../vehicle-images-row/vehicle-images-row';

export type UserCardProps = {
  user: DriverTransformer;
  onClose?: () => void;
};

export const UserCard: React.FC<UserCardProps> = ({ user, onClose }) => {
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
        top={5}
        right={5}
        backgroundColor={'$gray6'}
        width={34}
        size={'$3'}
        borderRadius={'$5'}
        icon={<X size="$1" />}
        onPress={() => onClose()}
      />
    );

  return (
    <View padding="$3" onPress={onPress}>
      <YStack backgroundColor={'$color2'} borderRadius={'$5'} gap="$2">
        <XStack justifyContent="space-between" padding="$4" alignItems="center">
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
        <YStack paddingBottom="$4">
          <UserInfoRow user={user} />
          <VehicleImagesRow medias={user?.vehicle?.images || []} />
        </YStack>

        <UserContactActions user={user} />
      </YStack>
    </View>
  );
};

export default UserCard;
