import { CustomIcon } from '@zix/ui/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Button, Sheet, XStack, useTheme } from 'tamagui';
import { MobileDrawer } from './MobileDrawer';
import { useMultiLang } from '@zix/i18n';

export function MobileHeader() {
  const {  activeLang } = useMultiLang();
  const [drawer, setDrawer] = useState(false);
  const router = useRouter();
  const renderDrawer = () => (
    <Sheet snapPoints={[100, 50]} open={drawer} modal={true}>
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
      paddingVertical="$1"
      overflow="hidden"
    >
      <Pressable onPress={() => setDrawer(!drawer)}>
        <CustomIcon name={'align_left'} size="$2" />
      </Pressable>
      <CustomIcon name={`web_logo_${activeLang}`} size={'$9'} />
      <Button
        unstyled
        backgroundColor="transparent"
        paddingVertical="$2"
        onPress={() => router.push('/auth/login')}
        $sm={{
          size: '$2',
          paddingVertical: '$1',
          alignItems: 'center',
        }}
        icon={<CustomIcon name={'account'} size="$1" />}
      ></Button>

      {renderDrawer()}
    </XStack>
  );
}
