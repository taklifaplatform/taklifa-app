import { XStack, YStack, Text, Image } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import React from 'react';
import { t } from 'i18next';
import { useMultiLang } from '@zix/i18n';

export function StartToday() {
  const { activeLang } = useMultiLang();
  return (
    <YStack bottom="-7%">
      <Image
        alt="Banner"
        source={{
          uri: `/images/banner-4-${activeLang}.png`,
         
        }}
        width= '100%'
        height={542}
        $sm={{
          width: '100%',
          height: 200
        }}
        resizeMode="contain"
      />
      <YStack position="absolute" padding="$4" gap="$4"
      $sm={{
        gap: "$1",
      }}
      >
        <Text fontWeight="bold" fontSize="$9" paddingVertical="$4"
        $sm={{
          fontSize: "$4",
          paddingVertical: "$1"
        }}
        >
        {t('web-home:banner-5')}
        </Text>
        <Text fontWeight="400" fontSize="$6" paddingVertical="$4"
        w={'70%'}
        $sm={{
          fontSize: "$1",
          paddingVertical: "$1",
          w: '80%'
        }}
        >
        {t('web-home:content-5')}
        </Text>
        <Text fontWeight="600" fontSize="$9" paddingVertical="$4"
        $sm={{
          fontSize: "$2",
          paddingVertical: "$1"
        }}
        >
        {t('web-home:download')}
        </Text>
        <XStack gap="$4">
         {/* <CustomIcon name="googleplay" size="$6" width="$12" />
          <CustomIcon name="appstore" size="$6" width="$12" />*/}
        </XStack>
      </YStack>
    </YStack>
  );
}
