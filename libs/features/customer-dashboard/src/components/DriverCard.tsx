import { X } from '@tamagui/lucide-icons';
import { DriverTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useMemo } from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, Image, Separator, View, Text, XStack, YStack } from 'tamagui';

export type DriverCardProps = {
  driver: DriverTransformer
  onClose?: () => void;
};

export const DriverCard: React.FC<DriverCardProps> = ({
  driver,
  onClose,
}) => {
  const router = useRouter()

  const activeCompany = useMemo(() => {
    return driver?.companies?.filter(company => company?.logo?.url).shift()
  }, [driver?.companies])

  function onPress() {
    router.push(`/users/${driver.id}`)
  }

  return (
    <View padding="$3" onPress={onPress}>
      <YStack backgroundColor={'$color2'} borderRadius={'$5'} gap="$2">
        <XStack justifyContent="space-between" padding="$4" alignItems='center'>
          <XStack alignItems="center" gap="$2">
            <UserAvatar user={driver} size='$5' />
            <YStack alignItems="flex-start">
              <Text color={'$black'} fontWeight="bold">
                {driver?.name}
              </Text>
              <Text color={'$gray10'}>
                متواجد الان
                ({driver?.companies?.length})
              </Text>
            </YStack>
          </XStack>
          {onClose && (<Button
            position='absolute'
            top={5}
            right={5}
            backgroundColor={'$gray6'}
            width={34}
            size={'$3'}
            borderRadius={'$5'}
            icon={<X size="$1" />}
            onPress={() => onClose()}
          />)}
          {
            activeCompany && (
              <Image
                source={{
                  uri: activeCompany?.logo?.url
                }}
                width={75}
                height={12}
                resizeMode='cover'
              />
            )
          }
        </XStack>
        <YStack paddingBottom="$4">
          <XStack
            justifyContent="space-between"
            paddingHorizontal="$4"

            paddingBottom="$4"
          >
            <XStack alignItems="center" gap="$2">
              <CustomIcon name="car" size={15} color="$color5" />
              <Text color={'$black'} fontWeight="600" fontSize="$1">
                {driver?.vehicle?.plate_number}
              </Text>
            </XStack>
            <Separator vertical borderColor="$gray10" borderWidth={0.3} />
            <XStack alignItems="center" gap="$2">
              <CustomIcon name="star" size={15} color="$color5" />
              <Text color={'$black'} fontWeight="600" fontSize="$1">
                {/* الرياض - 12 كم */}
                {driver?.location?.country?.name}
              </Text>
            </XStack>
            <Separator vertical borderColor="$gray10" borderWidth={0.3} />
            <XStack alignItems="center" gap="$2">
              <CustomIcon name="star" size={15} color="$color5" />
              <Text color={'$black'} fontWeight="600" fontSize="$1">
                ({driver.rating_stats?.count}) {driver.rating_stats?.score}
              </Text>
            </XStack>

          </XStack>
          <FlatList
            data={driver.vehicle?.images || []}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <YStack
                key={`key-${index}`}
                borderRadius="$4"
                width={62}
                height={43}
                marginHorizontal="$2"
              >
                <Image
                  source={{ uri: item.url }}
                  style={{
                    borderRadius: 8,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </YStack>
            )}
          />
        </YStack>

        <XStack justifyContent="space-between" padding="$2"
          backgroundColor='$color2'
          borderTopWidth={0.3}
          borderColor={'$gray8'}
        >
          <Button
            backgroundColor={'$color5'}
            size={'$3'}
            borderRadius={'$3'}
            fontWeight="400"
            icon={<CustomIcon name="followed" size="$1" />}
          >
            ارسال الدعوة
          </Button>
          <Button
            backgroundColor={'$gray7'}
            size={'$3'}
            borderRadius={'$3'}
            paddingVertical="$2"
            width="28%"
            fontWeight="400"
            icon={<CustomIcon name="chat" size="$1" />}
          >
            محادثة
          </Button>
          <Button
            backgroundColor={'$gray7'}
            size={'$3'}
            borderRadius={'$3'}
            width="28%"
            fontWeight="400"
            icon={<CustomIcon name="call" size="$1" />}
          >
            اتصل
          </Button>
        </XStack>
      </YStack>
    </View>
  );
};

export default DriverCard;
