import React from 'react';
import { Button, XStack, Text } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';

import { t } from 'i18next';
import { Pressable } from 'react-native';

export function Header() {
  return (
    <XStack
      $sm={{ display: 'none' }}
      flex={1}
      justifyContent='space-around'
      backgroundColor={'$color1'}
      alignItems="center"
      borderBottomLeftRadius={20}
      borderBottomRightRadius={20}
      borderTopWidth={2}
      borderTopColor={'$gray7'}
      marginBottom="$4"
    >
      <XStack gap="$3">
        <Button
        backgroundColor={'transparent'}
          borderColor={'$color5'}
          onPress={() => {}}
          icon={<CustomIcon name={'account'} size="$2" />}
        >
          <Text color="$white">{t('web-home:signup')}</Text>
        </Button>
        <Button backgroundColor="transparent" onPress={() => {}}>
          <Text>{t('web-home:call')}</Text>
          <CustomIcon name={'rigning'} size="$1" />
        </Button>
        <Button backgroundColor="transparent" onPress={() => {}}>
        <Text>{t('web-home:search')}</Text>
          <CustomIcon name={'search'} size="$1" />
        </Button>
      </XStack>
      <XStack>
        <CustomIcon name={'weblogo'} size={'$11'} />
      </XStack>
      <XStack gap="$3">
        <Button backgroundColor={'transparent'} onPress={() => {}}>
        <Text>{t('web-home:works')}</Text>
        </Button>
        <Button backgroundColor={'transparent'} onPress={() => {}}>
        <Text>{t('web-home:followers')}</Text>
        </Button>
        <Button backgroundColor={'transparent'} onPress={() => {}}>
        <Text>{t('web-home:payments')}</Text>
        </Button>
        <Button onPress={() => {}}><Text>{t('web-home:home')}</Text></Button>
       </XStack>
    </XStack>
  );
}
