import React from 'react';
import { YStack, Image, Button, Text } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { t } from 'i18next';
export function ManageShipments() {
  return (
    <YStack bottom="-5%" justifyContent="center">
      <Image
        alt="Banner"
        source={{
          uri: '/images/banner-3.png',
          width: '100%',
          height: 181
        }}
        resizeMode="contain"
      />
      <YStack
        pos={'absolute'}
        alignItems="center"
        justifyContent="center"
        w={'100%'}
        height={'100%'}
        space="$4"
      >
         <Button
        backgroundColor="transparent"
        borderRadius={10}
        padding="$2"
        w={164}
        position="absolute"
        borderWidth={1}
        borderColor="$color10"
        left="4%"
        icon={<CustomIcon name="account" size="$2" />}
      >
        <Text color="$black" fontWeight="600" fontSize="$4">
        {t('web-home:signup')}
        </Text>
      </Button>
        <Text fontWeight="bold" fontSize="$6">
        {t('web-home:banner-4')}
        </Text>
        <Text fontWeight="400" fontSize="$4">
        {t('web-home:content-4')}
        </Text>
      </YStack>
    </YStack>
  );
}
