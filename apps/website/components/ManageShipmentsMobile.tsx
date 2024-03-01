import React from 'react';
import { YStack, Image, Button, Text } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
export function ManageShipmentsMobile() {
  return (
    <YStack
      $gtSm={{ display: 'none' }}
      justifyContent="center"
      backgroundColor={'$color5'}
      borderRadius={10}
      paddingVertical="$5"
      paddingHorizontal="$4"
      marginTop="$10"
    >
      <YStack
        alignItems="center"
        justifyContent="center"
        w={'100%'}
        height={'100%'}
        gap="$3"
      >
        <Text fontWeight="bold" fontSize="$4" textAlign="center">
          {t('web-home:banner-4')}
        </Text>
        <Text fontWeight="400" fontSize="$3" textAlign="center">
          {t('web-home:content-4')}
        </Text>
        <Button
          backgroundColor="transparent"
          borderRadius={10}
          padding="$2"
          w={'100%'}
          borderWidth={1}
          borderColor="$color10"
          icon={<CustomIcon name="account" size="$2" />}
        >
          <Text color="$black" fontWeight="600" fontSize="$4">
            {t('web-home:signup')}
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
}
