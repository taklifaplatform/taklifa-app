import React from 'react';
import { YStack, Text, Image, XStack, Button } from '@zix/app/ui/core';
import { t } from 'i18next';
import { useMultiLang } from '@zix/i18n';

export function TopBanner() {
  const { activeLang } = useMultiLang();
  return (
    <YStack>
      <Image
        alt="Banner"
        source={{
          uri: `/images/banner-1-${activeLang}.png`,
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
        <Text fontWeight="bold" fontSize="$9" paddingVertical="$4">
          {t('web-home:banner-1')}
        </Text>
        <Text fontWeight="600" fontSize="$4">
          {t('web-home:content-1')}
        </Text>

        <XStack space="$4" paddingTop="$5">
          <Button
            backgroundColor={'$color'}
            borderRadius={10}
            size="$6"
            w={164}
          >
            <Text color="$color1" fontWeight="600" fontSize="$4">
              {t('web-home:company')}
            </Text>
          </Button>
          <Button
            backgroundColor={'transparent'}
            borderRadius={10}
            borderColor={'$black'}
            size="$6"
            w={164}
          >
            <Text color="$black" fontWeight="600" fontSize="$4">
              {t('web-home:singlecarrier')}
            </Text>
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
}
