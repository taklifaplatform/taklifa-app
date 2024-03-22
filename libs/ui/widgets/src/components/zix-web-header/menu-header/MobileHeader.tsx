import { CustomIcon } from '@zix/ui/icons';
import { useRouter } from 'solito/router';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Button, Dialog, Sheet, XStack, useTheme } from 'tamagui';
import { MobileDrawer } from './MobileDrawer';
import { useMultiLang } from '@zix/i18n';

export function MobileHeader() {
  const { activeLang } = useMultiLang();
  const [drawer, setDrawer] = useState(false);
  const router = useRouter();
  const renderDrawer = () => (
    <Dialog
      open={drawer}
      modal={true}
    >
      <Dialog.Portal>
        <Dialog.Overlay onPress={() => setDrawer(!drawer)} />
        <Dialog.Content
          justifyContent="center"
          alignSelf="center"
          borderRadius={20}
          width='90%'
        >
          <MobileDrawer />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
  return (
    <XStack
      justifyContent="space-between"
      $gtSm={{ display: 'none' }}
      backgroundColor='$white1'
      alignItems="center"
      borderRadius={10}
      borderTopColor={'$gray7'}
      paddingHorizontal="$4"
      marginVertical="$4"
      paddingVertical="$1"
      overflow="hidden"
      alignSelf="center"
      width='100%'
      height={70}
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
