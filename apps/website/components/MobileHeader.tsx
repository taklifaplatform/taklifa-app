import React, { useState } from 'react';
import { Button, XStack, Text, View, Sheet, useTheme } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { useMultiLang } from '@zix/i18n';
import { t } from 'i18next';
import { Pressable } from 'react-native';
import { MobileDrawer } from './MobileDrawer';

export function MobileHeader() {
  const theme = useTheme();
  const { isRtl } = useMultiLang();
  const [drawer, setDrawer] = useState(false);
  const renderDrawer = () => (
    <Sheet 
    snapPoints={[90, 50]} 
    open={drawer}
    modal={true}
    >
      <Sheet.Overlay onPress={() => setDrawer(!drawer)} />
      <Sheet.Handle />
      <Sheet.Frame>
        <MobileDrawer />
      </Sheet.Frame>
    </Sheet>
  );
  return (
    <XStack
      justifyContent="space-between"
      $gtSm={{ display: 'none' }}
      backgroundColor={'$color1'}
      alignItems="center"
      borderRadius={20}
      borderTopColor={'$gray7'}
      paddingHorizontal="$4"
      marginVertical="$4"
      paddingVertical="$2"
      overflow="hidden"
      // flex={1}
    >
      <Button
        backgroundColor="transparent"
        paddingVertical="$4"
        onPress={() => {}}
        $sm={{
          size: '$2',
          paddingVertical: '$1',
          alignItems: 'center',
        }}
        icon={<CustomIcon name={'account'} size="$1" />}
      >
        <Text fontSize="$3" color="$white" $sm={{display: 'none'}}>
          {t('web-home:signup')}
        </Text>
      </Button>
     
      {
        !theme.dark ? (
          <CustomIcon name={'weblogo'} width={'68px'} height={'32px'} />
        ) : (
          <CustomIcon name={'web-dark-logo'} width={'68px'} height={'32px'} />
        )
      }

      <Pressable onPress={() => setDrawer(!drawer)}>

        <CustomIcon name={'align_left'} size="$2" />
       
      </Pressable>
      {renderDrawer()}
    </XStack>
  );
}
