import React from 'react';
import { Button, XStack, Text } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';

import {t} from 'i18next'

export function Header() {
  return (
    <XStack
      $sm={{ display: 'none' }}
      justifyContent="space-between"
      w={'100%'}
      backgroundColor={'$color1'}
      alignItems="center"
      paddingVertical="$4"
      borderBottomLeftRadius={20}
      borderBottomRightRadius={20}
      borderTopWidth={2}
      borderTopColor={'$gray7'}
    >
      <XStack w={'45%'} space='$4' paddingHorizontal='$4'>
        <Button
          backgroundColor="transparent"
          paddingVertical="$4"
          onPress={() => {}}
          icon={<CustomIcon name={'account'} size="$2" />}
        >
          <Text color="$white">{t('web-home:signup')}</Text>
        </Button>
        <Button
         backgroundColor="transparent"
          paddingVertical="$4"
          onPress={() => {}}
          icon={<CustomIcon name={'rigning'} size="$2" />}
        >
          <Text color="$white">{t('web-home:call')}</Text>
        </Button>
        <Button
         backgroundColor="transparent"
          paddingVertical="$4"
          onPress={() => {}}
          icon={<CustomIcon name={'search'} size="$2" />}
        >
          <Text color="$white">{t('web-home:search')}</Text>
        </Button>
      </XStack>
      <XStack w={'10%'}>
        <CustomIcon name={'weblogo'} width="$15" height="$8" />
      </XStack>
      <XStack w={'45%'} justifyContent="flex-end" space="$4" paddingHorizontal='$4'>
        <Button 
        backgroundColor={'transparent'}
        paddingVertical="$4"
         onPress={() => {}}>
          <Text color="$white">{t('web-home:works')}</Text>
        </Button>
        <Button
          backgroundColor={'transparent'}
          paddingVertical="$4"
          onPress={() => {}}
        >
          <Text color="$white">{t('web-home:followers')}</Text>
        </Button>
        <Button
          backgroundColor={'transparent'}
          paddingVertical="$4"
          onPress={() => {}}
        >
          <Text color="$white">{t('web-home:payments')}</Text>
        </Button>
        <Button
          paddingVertical="$4"
          onPress={() => {}}
        >
          <Text color="$white">{t('web-home:home')}</Text>
        </Button>
      </XStack>
    </XStack>
  );
}
