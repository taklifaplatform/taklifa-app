
import { useMultiLang } from '@zix/i18n';
import { CustomIcon } from '@zix/ui/icons';
import { useAuth } from '@zix/utils';
import React from 'react';

import { View, Text, YStack } from 'tamagui';
import AccountSwitcher from '../account-switcher/account-switcher';
import { ZixLinkButton } from '@zix/ui/common';
import { Bell, Home, MessageCircle } from '@tamagui/lucide-icons';

export type SideBarProps = {
  //
}


export const SideBar: React.FC<SideBarProps> = () => {
  const { activeLang } = useMultiLang();
  const { user } = useAuth()

  return (
    <View flex={1} maxWidth={268} backgroundColor='$color2' padding='$4'>
      <ZixLinkButton unstyled href='/' >
        <CustomIcon name={`web_logo_${activeLang}`} height={50} width={165} />
      </ZixLinkButton>

      <YStack flex={1} gap='$2' paddingVertical='$4'>

        <ZixLinkButton display='headerMenu' icon={Home} href='/customer' >
          Home
        </ZixLinkButton>

        <ZixLinkButton display='headerMenu' icon={Bell} href='/customer/notifications' >
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
