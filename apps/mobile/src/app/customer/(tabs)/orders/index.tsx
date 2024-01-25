import { AppHeader } from '@zix/app/ui/common';
import { Avatar, Button, Stack, Text, View, XStack, YStack } from 'tamagui';
import MapView from 'react-native-maps';

import { CustomIcon } from '@zix/app/ui/icons';
import React, { useState } from 'react';
import { useTheme } from 'stream-chat-expo';
import { TouchableOpacity } from 'react-native';

// https://www.figma.com/file/2hwhnxKlAlXCt9EiP5tEb4/SAWAAD?type=design&node-id=2327-12534&mode=design&t=qL3wyztSyKaOgoFi-4
export default function Screen() {
  const {
    theme: {
      colors: { black, white }
    }
  } = useTheme();

  const [progress, setProgress] = useState(false);
  // render component header
  const renderHeader = () => (
    <XStack
      padding="$4"
      marginVertical="$1.5"
      borderBottomWidth={0.2}
      space="$2.5"
      borderColor={"#757575"}
    >
      <XStack flex={1} alignItems="center">
        <Avatar circular size="$4.5">
          <Avatar.Image
            accessibilityLabel="Nate Wienert"
            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
          />
          <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
        </Avatar>
        <Avatar
          circular
          size="$5"
          marginLeft="$-5"
          borderWidth="$1"
          borderColor="$gray6"
        >
          <Avatar.Image
            accessibilityLabel="Nate Wienert"
            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
          />
          <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
        </Avatar>
      </XStack>

      <YStack flex={2} justifyContent="space-between">
        <Text fontSize="$1" fontWeight="bold">
          John Doe
        </Text>
        <XStack alignItems="center" space="$1">
          <CustomIcon name="half_star" size={14} color="$color5" />
          <Text fontSize={10} color="$gray11">
            4.7/5
          </Text>
        </XStack>
        <XStack alignItems="center" space="$1">
          <CustomIcon name="local_shipping" size={14} color="$gray10" />
          <Text fontSize={10} color="$gray11" numberOfLines={1}>
            Mercedes-White TNJ7653
          </Text>
        </XStack>
      </YStack>

      <XStack flex={1} space="$2.5" alignItems="center">
        <Button
          size="$2.5"
          backgroundColor={'$gray2'}
          icon={(props) => <CustomIcon name="chat" color={black} {...props} />}
        />
        <Button
          size="$2.5"
          backgroundColor={'$gray2'}
          icon={(props) => <CustomIcon name="call" {...props} />}
        />
      </XStack>
    </XStack>
  );

  //render product status details
  const renderProductProgress = () => (
    <XStack padding="$4" marginVertical="$1.5" justifyContent="space-between">
      <Button
        size="$2.5"
        icon={(props) => <CustomIcon name="time" {...props} />}
        backgroundColor={'$gray2'}
        borderWidth="$1"
        borderColor="$gray6"
        w={'30%'}
      >
        30 Minute
      </Button>
      <Button
        size="$2.5"
        icon={(props) => <CustomIcon name="time" {...props} />}
        borderWidth="$1"
        borderColor="$gray6"
        backgroundColor={'$gray2'}
        w={'30%'}
      >
        Product
      </Button>
      <Button
        size="$2.5"
        borderWidth="$1"
        borderColor="$gray6"
        backgroundColor={'$gray2'}
        w={'30%'}
      >
        progress
      </Button>
    </XStack>
  );

  //render MapView
  const renderMapView = () => (
    <Stack
      marginVertical="$1.5"
      marginHorizontal="$4"
      height="$10"
      backgroundColor="gray"
      borderRadius="$5"
    >
      <MapView
        style={{
          flex: 1,
          borderRadius: 10
        }}
        initialRegion={{
          latitude: 10.762622,
          longitude: 106.660172,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    </Stack>
  );

  //render product details
  const data = [
    {
      id: 1,
      name: 'Start From',
      address: 'Ibn Rushd Street, King Fahd',
      date: 'December 09, 2023 - 10:00 AM',
      icon: 'location'
    },
    {
      id: 2,
      name: 'Arrive To',
      address: 'Al Naseem Al Sharqi, Riyadh',
      date: 'December 09, 2023 - 10:00 AM',
      icon: 'Time'
    }
  ];
  const renderProductDetails = () => (
    <YStack
      padding="$4"
      marginVertical="$1.5"
      justifyContent="space-between"
      w={'100%'}
    >
      {data.map((item, index) => (
        <XStack marginVertical="$1.5" justifyContent="space-between">
          <YStack alignItems="center">
            <View
              width={2}
              backgroundColor={index == 0 ? 'transparent' : 'rgba(52, 199, 89, 1)'}
              flex={0.5}
            />
            <CustomIcon name="local_shipping" size={14} color={black} />
            <View
              width={2}
              backgroundColor={index == (data.length - 1) ? 'transparent' : 'rgba(52, 199, 89, 1)'}
              flex={1}
            />
          </YStack>
          <XStack flex={1} padding="$5">
            <YStack space="$2">
              <XStack>
                <Text fontSize="$2" fontWeight="bold" col={'#34C759'}>
                  {item.name}
                </Text>
              </XStack>
              <Text fontSize="$2" fontWeight="bold">
                {item.address}
              </Text>
            </YStack>
            <Text
              position="absolute"
              left="50%"
              top="30%"
              fontSize="$1"
              fontWeight="bold"
              color={'$gray9'}
            >
              {item.date}
            </Text>
          </XStack>
        </XStack>
      ))}
    </YStack>
  );

  //render View Details & ID
  const renderProductFooterViewDetails = () => (
    <XStack
      justifyContent={progress ? 'space-between' : 'center'}
      padding="$4"
      backgroundColor={'$gray2'}
      borderRadius={'$5'}
      alignItems="center"
    >
      <Button
        size="$4"
        backgroundColor={progress ? black : '$gray6'}
        color={progress ? white : '#757575'}
        borderColor={progress ? 'transparent' : '#757575'}
        borderWidth={1}
      >
        View details
      </Button>
      {progress && <Text>#256998622 ID</Text>}
    </XStack>
  );

  // render status bar
  const renderTopStatusBar = () => (
    <XStack
      paddingHorizontal="$4"
      justifyContent="space-between"
      backgroundColor={'#34C759'}
      alignItems="center"
      paddingVertical="$2"
    >
      <XStack alignItems="center" space="$1">
        <View
          style={{
            padding: 5,
            backgroundColor: 'rgba(246, 246, 246, 0)',
            borderRadius: 100
          }}
        >
          <CustomIcon name="local_shipping" size={14} color={white} />
        </View>
        <Text color={white} fontSize="$2" fontWeight={'bold'}>
          In Progress
        </Text>
      </XStack>
      <Text color={white} fontSize="$2" fontWeight={'bold'}>
        #46545656454
      </Text>
    </XStack>
  );

  // render Expected Time
  const renderExpectedTime = () => (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      margin="$2"
      paddingTop="$4"
    >
      <XStack alignItems="center" space="$2">
        <CustomIcon name="time" color="$gray5" />
        <Text fontSize="$2" fontWeight={'bold'} col={'#757575'}>
          Expected Time
        </Text>
      </XStack>
      <Text color={black} fontSize="$5" fontWeight={'bold'}>
        00:00:30
      </Text>
    </XStack>
  );

  return (
    <>
      <AppHeader showBackButton title="Orders" />

      <View backgroundColor="gray" flex={1}>
        <TouchableOpacity onPress={() => setProgress(!progress)}>
          <Text>switch</Text>
        </TouchableOpacity>
        <View
          backgroundColor="white"
          margin="$4"
          borderRadius="$5"
          overflow="hidden"
        >
          {!progress && renderTopStatusBar()}
          {renderHeader()}
          {progress ? renderProductProgress() : renderExpectedTime()}
          {progress && renderMapView()}
          {renderProductDetails()}
          {renderProductFooterViewDetails()}
        </View>
      </View>
    </>
  );
}
