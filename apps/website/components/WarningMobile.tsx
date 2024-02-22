import React from 'react';
import { YStack, Image, Button, Text, XStack } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { t } from 'i18next';

export function WarningMobileBanner() {
  return (
    <YStack bottom='-15.5%'
      position='absolute'
      justifyContent="center"
      alignItems='center'
      $gtSm={{ display: 'none' }}
      gap="$3"
      backgroundColor={'$red4'}
      paddingTop="$3"
      borderRadius="$3"
      w={'96%'}
      >

      <Text fontWeight="bold" fontSize="$4"
      >
        {t('web-home:warningtitle')}
      </Text>
      <Text fontWeight="400" fontSize="$2" textAlign='center'
      >
        {t('web-home:warningcontent')}
      </Text>


      <Button
        backgroundColor="red"
        size={'$2'}
        w={'90%'}
        icon={<CustomIcon name="large_arrow_left" size="$1" color={'$color1'} />}
      >
        <Text color="$color1" fontWeight="600" fontSize="$3">
          {t('web-home:warningbtn')}
        </Text>
      </Button>
      <Image
        alt="Banner"
        source={{
          uri: '/images/bottom-warning.png',
          width: '100%',
          height: 20
        }}
        resizeMode="cover"
      />
    </YStack>
  );
}
