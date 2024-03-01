import { Button, Separator, XStack, YStack, Image, Text } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { X } from '@tamagui/lucide-icons';
import { FlatList } from 'react-native';

export type DriverCardProps = {
  item: any;
  setShowCarousel: (show: boolean) => void;
  setSelectedMarker: (marker: any) => void;
  map: boolean
};

export const DriverCard: React.FC<DriverCardProps> = ({
  item,
  setShowCarousel,
  setSelectedMarker,
  map
}) => {
  const onCancel = () => {
    setShowCarousel && setShowCarousel(false);
    setSelectedMarker && setSelectedMarker({});
  };
  const TruckData = [
    {
      id: 1,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDr1iNlZyXl2Tl3xXUYOv1NhZdkuBgKTQWi_x6-L_UgXM5xidO8mKMqZzFr9Qg8ICMPSk&usqp=CAU',
    },
    {
      id: 2,
      image:
        'https://imageio.forbes.com/specials-images/imageserve/6064b148afc9b47d022718d1/Hennessey-Venom-F5/960x0.jpg?height=473&width=711&fit=bounds',
    },
    {
      id: 3,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPtEGkbiVgBu7N4sHEfsoz0gM4VqfpMKPUmOOldo02jM_kxYyT4uxtmlzLxgk51IlaEIQ&usqp=CAU',
    },
    {
      id: 3,
      image:
        'https://play-lh.googleusercontent.com/Gtq3-k_EByT2U3AeVEOXkemgwwfx9MLJR2k0Y-_X7Yvj4pD0idrUjINevdN0kehMyYg=w526-h296-rw',
    },
    {
      id: 3,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPtEGkbiVgBu7N4sHEfsoz0gM4VqfpMKPUmOOldo02jM_kxYyT4uxtmlzLxgk51IlaEIQ&usqp=CAU',
    },
  ];
  return (
    <YStack backgroundColor={'$color2'} borderRadius={'$5'} gap="$2">
      <XStack justifyContent="space-between" padding="$4" alignItems='center'>
        <XStack alignItems="center" gap="$2">
          <Image
            source={{
              uri: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1434',
            }}
            width={50}
            height={50}
            borderRadius={50}
            // zIndex={1}
            borderWidth={3}
            borderColor={'#34C759'}
          />
          <YStack alignItems="flex-start">
            <Text color={'$black'} fontWeight="bold">
              فلان بن فلان
            </Text>
            <Text color={'$gray10'}>متواجد الان</Text>
          </YStack>
        </XStack>
        {map && (<Button
          position='absolute'
          top={5}
          right={5}
          backgroundColor={'$gray6'}
          width={34}
          size={'$3'}
          borderRadius={'$5'}
          icon={<X size="$1" />}
          onPress={() => onCancel()}
        />)}
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Aramex_logo.svg/2560px-Aramex_logo.svg.png',
          }}
          width={75}
          height={12}
          resizeMode='cover'
          marginRight={map ? '$6' : 0}
        />
      </XStack>
      <YStack

        paddingBottom="$4"
      >
        <XStack
          justifyContent="space-between"
          paddingHorizontal="$4"

          paddingBottom="$4"
        >
          <XStack alignItems="center" space="$2">
            <CustomIcon name="car" size={15} color="$color5" />
            <Text color={'$black'} fontWeight="600" fontSize="$1">
              هارلي دفيدسون {item?.id}
            </Text>
          </XStack>
          <Separator vertical borderColor="$gray10" borderWidth={0.3} />
          <XStack alignItems="center" space="$2">
            <CustomIcon name="star" size={15} color="$color5" />
            <Text color={'$black'} fontWeight="600" fontSize="$1">
              الرياض - 12 كم
            </Text>
          </XStack>
          <Separator vertical borderColor="$gray10" borderWidth={0.3} />
          <XStack alignItems="center" space="$2">
            <CustomIcon name="star" size={15} color="$color5" />
            <Text color={'$black'} fontWeight="600" fontSize="$1">
              (188) 4.8
            </Text>
          </XStack>

        </XStack>
        <FlatList
          data={TruckData}
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
                source={{ uri: item.image }}
                style={{
                  borderRadius: 8,
                  width: '100%',
                  height: '100%',
                }}
              // resizeMode='contain'
              />
            </YStack>
          )}
        />
      </YStack>

      <XStack justifyContent="space-between" padding="$2"
        backgroundColor={map ? '$color2' : '$color1'}
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
  );
};

export default DriverCard;
