import React from 'react';
import { YStack, Text, Image, XStack, Button } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { t } from 'i18next';

export function SecondBanner() {
  return (
    <YStack>
      <Image
        alt="Banner"
        source={{
          uri: '/images/banner-2.png',
          width: '100%',
          height: 632
        }}
        resizeMode="contain"
      />
      <YStack
        position="absolute"
        alignItems="center"
        w={'100%'}
        justifyContent="center"
        paddingVertical="$10"
      >
        <XStack alignItems="center" space="$2">
          <CustomIcon name="large_arrow_left" size="$2" color="$gray10" />
          <Text fontWeight="bold" fontSize="$9">
          {t('web-home:banner-2')}
          </Text>
        </XStack>
        <Text
          fontWeight="400"
          fontSize="$4"
          textAlign="center"
          width="80%"
          paddingTop="$6"
        >
          {t('web-home:content-2')}</Text>
      </YStack>
      <XStack
        bottom={'12%'}
        position="absolute"
        zIndex={100}
        w={'100%'}
        alignItems="center"
        justifyContent="center"
        space="$13"
      >
        <YStack alignItems="center" space="$2">
          <CustomIcon name="client" size="$6" />
          <Text fontWeight="600">{t('web-home:client')}</Text>
        </YStack>
        <YStack alignItems="center" space="$2">
          <CustomIcon name="shipping" size="$6" />
          <Text fontWeight="600">{t('web-home:driver')}</Text>
        </YStack>
        <YStack alignItems="center" space="$2">
          <CustomIcon name="companyshipping" size="$6" />
          <Text fontWeight="600">{t('web-home:company')}</Text>
        </YStack>
      </XStack>
      <YStack
        position="absolute"
        alignItems="center"
        w={'100%'}
        justifyContent="center"
        paddingVertical="$10"
        bottom={'-27%'}
        backgroundColor={'$color1'}
        borderRadius='$4'
      >
        <XStack alignItems="center" space="$2" paddingTop='$12'>
          <CustomIcon name="large_arrow_left" size="$2" color="$gray10"/>
          <Text fontWeight="bold" fontSize="$9">
          {t('web-home:banner-3')}
          </Text>
        </XStack>
        <Text
          fontWeight="400"
          fontSize="$4"
          textAlign="center"
          width="80%"
          paddingTop="$6"
        >
         {t('web-home:content-3')}
        </Text>
      </YStack>
    </YStack>
  );
}
