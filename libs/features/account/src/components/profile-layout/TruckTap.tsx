import { ChevronDown } from '@tamagui/lucide-icons';
import { FlatList, Image } from 'react-native';
import { YStack, Text, XStack, Accordion, Square } from 'tamagui';

export function TruckTap() {
  const workTimeData = [
    {
      id: 6,
      title: 'Saturday',
      time: '9qdqdqs PM',
    },
    {
      id: 7,
      title: 'Model',
      time: 'qsdqs',
    },
    {
      id: 1,
      title: 'Year',
      time: 'qsdqs',
    },
    {
      id: 2,
      title: 'Color',
      time: 'qsdqsdsq',
    },
    {
      id: 3,
      title: 'Truck plate',
      time: 'qsdqsM',
    },
    {
      id: 4,
      title: 'Number Doors',
      time: 'qsdqsd',
    },
    {
      id: 5,
      title: 'Number sits',
      time: 'azeaze',
    },
    {
      id: 9,
      title: 'Trunk capacity (litres)',
      time: 'azeaz',
    },
  ];

  const TruckData = [
    {
      id: 1,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPtEGkbiVgBu7N4sHEfsoz0gM4VqfpMKPUmOOldo02jM_kxYyT4uxtmlzLxgk51IlaEIQ&usqp=CAU',
    },
    {
      id: 2,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPtEGkbiVgBu7N4sHEfsoz0gM4VqfpMKPUmOOldo02jM_kxYyT4uxtmlzLxgk51IlaEIQ&usqp=CAU',
    },
    {
      id: 3,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPtEGkbiVgBu7N4sHEfsoz0gM4VqfpMKPUmOOldo02jM_kxYyT4uxtmlzLxgk51IlaEIQ&usqp=CAU',
    },
  ];
  return (
    <YStack flex={1} width={'100%'}>
      <Accordion overflow="hidden" width="100%" type="multiple">
        <Accordion.Item value="a1">
          <Accordion.Trigger
            flexDirection="row"
            justifyContent="space-between"
            borderBlockEndColor={'transparent'}
            borderBlockStartColor={'transparent'}
            borderLeftColor={'transparent'}
            borderRightColor={'transparent'}
            backgroundColor={'transparent'}
          >
            {({ open }) => (
              <>
                <Text fontSize={'$3'} fontWeight={'700'}>
                  Truck Photo
                </Text>
                <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content backgroundColor={'transparent'}>
            <FlatList
              data={TruckData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <YStack
                  borderRadius="$4"
                  width={152}
                  height={104}
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
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="a2">
          <Accordion.Trigger
            backgroundColor={'transparent'}
            borderBlockEndColor={'transparent'}
            borderBlockStartColor={'transparent'}
            borderLeftColor={'transparent'}
            borderRightColor={'transparent'}
            flexDirection="row"
            justifyContent="space-between"
          >
            {({ open }) => (
              <>
                <Text fontSize={'$3'} fontWeight={'700'}>
                  About Truck
                </Text>
                <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content backgroundColor={'transparent'}>
            {workTimeData.map((item, index) => (
              <XStack
                backgroundColor={item.work ? '#FFECEB' : '$gray4'}
                padding="$2"
                borderRadius="$2"
                space="$4"
                marginBottom="$2"
              >
                <Text
                  fontSize={'$2'}
                  fontWeight="bold"
                  paddingRight="$2"
                  width={'50%'}
                >
                  {item.title}
                </Text>
                <Text fontSize={'$2'}>{item.time}</Text>
              </XStack>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </YStack>
  );
}
