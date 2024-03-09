import { X } from '@tamagui/lucide-icons';
import { DriverTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { useMemo } from 'react';
import { useRouter } from 'solito/router';
import { Button, Image, Text, View, XStack, YStack } from 'tamagui';
import DriverContactActions from '../driver-contact-actions/driver-contact-actions';
import DriverStatsRow from '../driver-stats-row/driver-stats-row';
import DriverVehicleImagesRow from '../driver-vehicle-images-row/driver-vehicle-images-row';

export type DriverCardProps = {
  driver: DriverTransformer;
  onClose?: () => void;
};

export const DriverCard: React.FC<DriverCardProps> = ({ driver, onClose }) => {
  const router = useRouter();

  const activeCompany = useMemo(() => {
    return driver?.companies?.filter((company) => company?.logo?.url).shift();
  }, [driver?.companies]);

  function onPress() {
    router.push(`/users/${driver.id}`);
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
            <UserAvatar user={driver} size="$5" />
            <YStack alignItems="flex-start">
              <Text color={'$black'} fontWeight="bold">
                {driver?.name}
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
          <DriverStatsRow driver={driver} />
          <DriverVehicleImagesRow medias={driver?.vehicle?.images || []} />
        </YStack>

        <DriverContactActions driver={driver} />
      </YStack>
    </View>
  );
};

export default DriverCard;
