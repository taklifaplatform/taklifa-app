
import { useMultiLang } from '@zix/i18n';
import { useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';

import { Bell, Home, MessageCircle } from '@tamagui/lucide-icons';
import { ZixLinkButton } from '@zix/ui/common';
import { View, YStack } from 'tamagui';
import AccountSwitcher from '../account-switcher/account-switcher';

export type SideBarProps = {
  //
}


export const SideBar: React.FC<SideBarProps> = () => {
  const { activeLang } = useMultiLang();
  const { user } = useAuth()

  return (
    <View position='sticky' top={0} bottom={0} left={0} flex={1} maxWidth={268} maxHeight='100vh' backgroundColor='$color2' padding='$4'>
      <ZixLinkButton unstyled href='/' >
        <CustomIcon name={`web_logo_${activeLang}`} height={50} width={165} />
      </ZixLinkButton>

      <YStack flex={1} gap='$2' paddingVertical='$4'>

        <ZixLinkButton display='headerMenu' icon={Home} href='/customer' >
          Home
        </ZixLinkButton>

        <ZixLinkButton display='headerMenu' icon={Bell} href='/notifications' >
          Notifications
        </ZixLinkButton>

        <ZixLinkButton display='headerMenu' icon={MessageCircle} href='/chat' >
          Chat
        </ZixLinkButton>
      </YStack>
      <AccountSwitcher />
    </View>
  );
}


export default SideBar;
