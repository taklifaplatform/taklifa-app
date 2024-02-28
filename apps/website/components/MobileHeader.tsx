import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Button, Sheet, Text, XStack, useTheme } from 'tamagui';
import { MobileDrawer } from './MobileDrawer';
import { useRouter } from 'next/router';
import { ro } from 'date-fns/locale';

export function MobileHeader() {
  const theme = useTheme();
  const [drawer, setDrawer] = useState(false);
  const router = useRouter();
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
      unstyled
        backgroundColor="transparent"
        paddingVertical="$4"
        onPress={() => router.push('/auth/login')}
        $sm={{
          size: '$2',
          paddingVertical: '$1',
          alignItems: 'center',
        }}
        icon={<CustomIcon name={'account'} size="$1" />}
      >
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
