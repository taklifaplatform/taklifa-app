import { XStack, YStack, Text, Image } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import React from 'react';
import { t } from 'i18next';
import { useMultiLang } from '@zix/i18n';

export function StartToday() {
  const { activeLang } = useMultiLang();
  return (
    <YStack bottom="-5%">
      <Image
        alt="Banner"
        source={{
          uri: `/images/banner-4-${activeLang}.png`,
          width: '100%',
          height: 542
        }}
        resizeMode="contain"
      />
      <YStack position="absolute" padding="$4" space="$4">
        <Text fontWeight="bold" fontSize="$9" paddingVertical="$4">
        {t('web-home:banner-5')}
        </Text>
        <Text fontWeight="400" fontSize="$6" paddingVertical="$4"
        w={'70%'}
        >
        {t('web-home:content-5')}
        </Text>
        <Text fontWeight="600" fontSize="$9" paddingVertical="$4">
        {t('web-home:download')}
        </Text>
        <XStack space="$4">
          <CustomIcon name="googleplay" size="$6" width="$12" />
          <CustomIcon name="appstore" size="$6" width="$12" />
        </XStack>
      </YStack>
    </YStack>
  );
}
