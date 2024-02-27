import React from 'react';
import { Button, XStack, Text, View, Sheet, useTheme } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { useMultiLang } from '@zix/i18n';
import { t } from 'i18next';
import { Pressable } from 'react-native';

export function MobileHeader({ drawer, setDrawer }) {
  const theme = useTheme();
  const { isRtl } = useMultiLang();
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
        {
          !theme.dark ? (
            <CustomIcon name={'web-dark-logo'} size={'$7'} />
          ) : (
            <CustomIcon name={'weblogo'} size={'$7'} />
          ) 
        }

      <Pressable onPress={() => setDrawer(!drawer)}>

        <CustomIcon name={'align_left'} size="$2" />
       
      </Pressable>
    </XStack>
  );
}
