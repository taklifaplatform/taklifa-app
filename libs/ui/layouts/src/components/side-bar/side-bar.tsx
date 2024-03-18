import { useMultiLang } from '@zix/i18n';
import { USER_ROLES, useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import React, { useMemo } from 'react';

import { Bell, Home, MessageCircle, Moon } from '@tamagui/lucide-icons';
import { useThemeSetting } from '@tamagui/next-theme';
import { Settings, ZixLinkButton } from '@zix/ui/common';
import { View, YStack } from 'tamagui';
import AccountSwitcher from '../account-switcher/account-switcher';

export type SideBarProps = {
  //
}


export const SideBar: React.FC<SideBarProps> = () => {
  const { activeLang } = useMultiLang();
  const { user, activeRole, getRoleUrlPrefix } = useAuth()
  const { toggle, current } = useThemeSetting()

  const urlPrefix = useMemo(() => {
    return getRoleUrlPrefix(activeRole)
  }, [activeRole])

  return (
    <View position='sticky' top={0} bottom={0} left={0} width={268} maxHeight='100vh' backgroundColor='$color2' padding='$4'>
      <ZixLinkButton unstyled href='/' >
        <CustomIcon name={`web_logo_${activeLang}`} height={50} width={165} />
      </ZixLinkButton>

      <YStack flex={1} gap='$2' paddingVertical='$4'>
        <ZixLinkButton display='headerMenu' icon={Home} href={urlPrefix} >
          Home
        </ZixLinkButton>

        <ZixLinkButton display='headerMenu' icon={Bell} href={`${urlPrefix}/notifications`} >
          Notifications
        </ZixLinkButton>

        <ZixLinkButton display='headerMenu' icon={MessageCircle} href={`${urlPrefix}/chat`} >
          Chat
        </ZixLinkButton>

        <ZixLinkButton display='headerMenu' icon={MessageCircle} href={`${urlPrefix}/shipments`} >
          Orders
        </ZixLinkButton>

        {
          activeRole !== USER_ROLES.customer && (
            <ZixLinkButton display='headerMenu' icon={MessageCircle} href={`${urlPrefix}/jobs`} >
              Jobs
            </ZixLinkButton>
          )
        }
      </YStack>
      <Settings>
        <Settings.Items>
          <Settings.Group $gtSm={{ space: '$2' }}>
            <Settings.Item icon={Moon} onPress={toggle} rightLabel={current}>
              Theme
            </Settings.Item>
          </Settings.Group>
        </Settings.Items>
      </Settings>
      <AccountSwitcher />
    </View >
  );
}


export default SideBar;
