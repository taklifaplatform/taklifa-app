import React from 'react';
import { Button, XStack, Text, View, Sheet } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';

import { t } from 'i18next';

export function MobileHeader({ drawer, setDrawer }) {
  return (
    <XStack
      justifyContent="space-between"
      width={'100%'}
      $gtSm={{ display: 'none' }}
      backgroundColor={'$color1'}
      alignItems="center"
      paddingVertical="$4"
      borderRadius={20}
      borderTopColor={'$gray7'}
      paddingHorizontal="$4"
      marginVertical="$4"
      overflow="hidden"
      // flex={1}
    >
      <Button
        backgroundColor="transparent"
        paddingVertical="$4"
        borderWidth={1}
        borderColor="$color5"
        onPress={() => {}}
        $sm={{
          size: '$2',
          paddingVertical: '$1',
        }}
        icon={<CustomIcon name={'account'} size="$1" />}
      >
        <Text fontSize="$3" color="$white">
          {t('web-home:signup')}
        </Text>
      </Button>
      <CustomIcon name={'weblogo'} width="$6" height="$2.5" color="$color5" />

      <View onPress={() => setDrawer(!drawer)}>
        <CustomIcon name={'drawer'} size="$1" />
      </View>
    </XStack>
  );
}
