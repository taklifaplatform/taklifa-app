import React from 'react';
import { YStack, Image, Button, Text, XStack } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';

export function WarningBanner() {
  return (
    <YStack
      bottom="-22%"
      justifyContent="center"
      $sm={{ display: 'none' }}
      w={'100%'}
    >
      <Image
        alt="Banner"
        source={{
          uri: '/images/cheating.png',
          width: '100%',
          height: 181,
        }}
        resizeMode="contain"
      />
      <XStack position="absolute" w={'100%'} justifyContent="space-around">
        <Button
          backgroundColor="red"
          padding="$2"
          icon={
            <CustomIcon name="large_arrow_left" size="$2" color={'$color1'} />
          }
        >
          <Text color="$color1" fontWeight="600" fontSize="$4">
            {t('web-home:warningbtn')}
          </Text>
        </Button>
        <YStack
          alignItems="flex-end"
          justifyContent="center"
          height={'100%'}
          space="$4"
          paddingRight="$10"
        >
          <Text fontWeight="bold" fontSize="$6">
            {t('web-home:warningtitle')}
          </Text>
          <Text fontWeight="400" fontSize="$4">
            {t('web-home:warningcontent')}
          </Text>
        </YStack>
      </XStack>
    </YStack>
  );
}
