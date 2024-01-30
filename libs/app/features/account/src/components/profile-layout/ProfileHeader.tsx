import { Image, Linking } from 'react-native';
import React from 'react';
import { YStack, Text, XStack, Button, Separator } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';

export function ProfileHeader() {
  const renderInformation = (title: string, icon: string) => (
    <XStack alignItems="center">
      <CustomIcon name={icon} size={20} color={'#FECA16'} />
      <Text paddingLeft="$2">{title}</Text>
    </XStack>
  );
  const renderButton = (
    title: string,
    icon: string,
    color: string,
    onPress: any
  ) => (
    <XStack>
      <Button backgroundColor={color} onPress={onPress} size={'$3'}>
        <CustomIcon name={icon} size={20} color={'black'} />
        <Text fontWeight="600">{title}</Text>
      </Button>
    </XStack>
  );

  const onCallPress = () => {
    console.log('call');
    // call
    Linking.openURL('tel:1196546546');
  };
  return (
    <>
      <YStack
        alignItems="center"
        justifyContent="center"
        backgroundColor={'#F6F6F6'}
        borderRadius="$2"
        paddingTop="$6"
        marginBottom="$4"
      >
        <Image
          source={{
            uri: 'https://musicart.xboxlive.com/7/4d4d6500-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080'
          }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: '#34C759'
          }}
          resizeMode="center"
        />
        <Text fontSize="$3" fontWeight="bold" marginTop="$2">
          John Doe
        </Text>
        <Text fontSize="$3" fontWeight="500" color={'#757575'} marginTop="$2">
          Available now
        </Text>
        <XStack justifyContent="space-between" space="$4" paddingVertical="$4">
          {renderInformation('Harley davidson', 'car')}
          <Separator vertical backgroundColor="$grey6" />
          {renderInformation('Riyadh', 'location')}
          <Separator vertical />
          {renderInformation('(188) 4.8', 'star')}
        </XStack>
      </YStack>
      <XStack justifyContent="space-between" space="$4" width={'100%'}>
        {renderButton('Service request', 'star', '')}
        {renderButton('Chat', 'chat', '#E0E0E0')}
        {renderButton('Call', 'call', '#E0E0E0', () => onCallPress())}
      </XStack>
    </>
  );
}
