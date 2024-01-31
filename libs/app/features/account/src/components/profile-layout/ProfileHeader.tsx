import { Linking } from 'react-native';
import React from 'react';
import { YStack, Text, XStack, Button, Separator, H4 } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { UserAvatar } from '@zix/app/ui/common';
import { Link, useLink } from 'solito/link';

export function ProfileHeader({ profile, name }) {
  const renderInformation = (title: string, icon: string) => (
    <XStack alignItems="center">
      <CustomIcon name={icon} size={20} color={'#FECA16'} />
      <Text paddingLeft="$2"
      fontWeight='600'
      >{title}</Text>
    </XStack>
  );
  const renderButton = (
    title: string,
    icon: string,
    color: string,
    onPress: any
  ) => (
    <XStack>
      <Button backgroundColor={color} onPress={onPress} size={'$3'} borderRadius={'$6'}>
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
      {/*  <Button
          position="absolute"
          left={0}
          size="$1"
          marginHorizontal="$4"
          {...useLink({ href: '/account/edit' })}
        >
          Edit Profile
        </Button>*/}
        <YStack gap="$2" paddingBottom='$4'>
          <XStack gap="$2" justifyContent="center" $sm={{ marginTop: '$4' }}>
            <UserAvatar user={profile} size="$9" borderColor={"#34C759"} borderWidth={"$1.5"}/>
          </XStack>
          <YStack gap="$2">
            {name ? (
              <H4 textAlign="center">{name}</H4>
            ) : (
              <Link href="/account/edit?edit_name=1">
                <H4 textAlign="center" textDecorationLine="underline">
                  No Name
                </H4>
              </Link>
            )}
            <Text textAlign="center"
            fontWeight='bold'
            color='$gray10'
            >Online now</Text>
          </YStack>
        </YStack>
        <XStack justifyContent="space-between" space="$4" paddingVertical="$4">
          {renderInformation('Harley davidson', 'car')}
          <Separator vertical borderColor={'$gray7'} />
          {renderInformation('Riyadh', 'location')}
          <Separator vertical borderColor={'$gray7'} />
          {renderInformation('(188) 4.8', 'star')}
        </XStack>
      </YStack>
      <XStack justifyContent="space-around" width={'100%'}>
        {renderButton('Service request', 'followed', '#FECA16')}
        {renderButton('Chat', 'chat', '#E0E0E0')}
        {renderButton('Call', 'call', '#E0E0E0', () => onCallPress())}
      </XStack>
    </>
  );
}
