import React from 'react';
import { XStack, YStack, Text, Image } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { t } from 'i18next';

export function Accredited() {
  return (
    <YStack
     // position="absolute"
      alignItems="center"
      w={'100%'}
      justifyContent="center"
      paddingVertical="$10"
      bottom={'-4%'}
      backgroundColor={'$color1'}
      borderRadius="$4"
    >
      <XStack alignItems="center" space="$4" paddingTop="$12">
        <CustomIcon name="large_arrow_left" size="$2" color="$gray10" />
        <Text fontWeight="bold" fontSize="$9">
        {t('web-home:banner-6')}
        </Text>
      </XStack>
      <Text
        fontWeight="400"
        fontSize="$4"
        textAlign="center"
        width="80%"
        paddingTop="$6"
      >
        {t('web-home:content-6')}
      </Text>
      <XStack
        alignItems="center"
        justifyContent="space-around"
        w={'100%'}
        paddingTop="$10"
      >
        <Image
          source={{
            uri: '/images/TNT_Express_Logo.png',
            width: 108,
            height: 39
          }}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: '/images/FedEx_Express.png',
            width: 86,
            height: 40
          }}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: '/images/Aramex_logo.png',
            width: 243,
            height: 40
          }}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: '/images/Amazon_logo.png',
            width: 131,
            height: 39
          }}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: '/images/DHL_Logo.png',
            width: 280,
            height: 40
          }}
          resizeMode="contain"
        />
      </XStack>
    </YStack>
  );
}
