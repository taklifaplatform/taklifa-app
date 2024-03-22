import { useMultiLang } from '@zix/i18n';
import { useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import React, { useMemo } from 'react';

import { IconProps } from '@tamagui/helpers-icon';
import { LogOut } from '@tamagui/lucide-icons';
import { useThemeSetting } from '@tamagui/next-theme';
import { Settings, ZixLinkButton } from '@zix/ui/common';
import { usePathname } from '@zix/utils';
import { useRouter } from 'solito/router';
import { Separator, View, YStack } from 'tamagui';
import AccountSwitcher from '../account-switcher/account-switcher';

export type SideBarProps = {
  //
}

type MenuItemType = {
  title: string
  icon: React.ReactNode
  href?: string
  onPress?: () => void
}

export const SideBar: React.FC<SideBarProps> = () => {
  const router = useRouter()
  const { activeLang } = useMultiLang();
  const { activeRole, getUrlPrefix, logout } = useAuth()
  const { toggle: toggleTheme, current } = useThemeSetting()
  const pathname = usePathname()


  const menuGroups = useMemo(() => {
    return [
      [
        {
          title: 'Home',
          icon: (props: IconProps) => <CustomIcon name="home" {...props} />,
          href: getUrlPrefix
        },

        {
          title: 'Orders',
          icon: (props: IconProps) => <CustomIcon name="orders" {...props} />,
          href: `${getUrlPrefix}/shipments`
        },
        {
          title: 'Jobs',
          icon: (props: IconProps) => <CustomIcon name="job" {...props} />,
          href: `${getUrlPrefix}/jobs`
        }
      ],
      [
        {
          title: 'Notifications',
          // icon: Bell,
          icon: (props: IconProps) => <CustomIcon name="notifications" {...props} />,
          href: `${getUrlPrefix}/notifications`
        },
        {
          title: 'Chat',
          icon: (props: IconProps) => <CustomIcon name="chat" {...props} />,
          href: `${getUrlPrefix}/chat`
        },
      ],
      [
        {
          title: 'Theme',
          icon: (props) => <CustomIcon name="theme" {...props} />,
          onPress: toggleTheme
        },
      ],
      [
        {
          title: 'Logout',
          icon: LogOut,
          onPress: logout
        },
      ],
    ]

  }, [activeRole, getUrlPrefix])

  const renderMenuItem = (item: MenuItemType, index) => (
    <Settings.Item
      key={`${index}-${item.title}`}
      icon={item.icon}
      // rightLabel='4'
      hideRightChevron
      backgroundColor={pathname === item.href ? '$backgroundFocus' : '$gray3'}
      onPress={() => item?.onPress ? item.onPress() : router.push(item.href)}
      accentColor="$green9"
      right={() => null}
    >
      {item.title}
    </Settings.Item>
  )

  return (
    <View position='sticky' top={0} bottom={0} left={0} width={320} maxHeight='100vh' backgroundColor='$gray3'>
      <ZixLinkButton unstyled href='/' paddingVertical='$4' >
        <CustomIcon name={`web_logo_${activeLang}`} height={50} width={165} />
      </ZixLinkButton>

      <Settings marginTop="$6" backgroundColor='$gray3'>
        <Settings.Items>
          <Settings.Group $gtSm={{ space: '$2' }}>
            {
              menuGroups.map((menuItems, index) => (
                <YStack key={index} gap='$2'>
                  {
                    menuItems.map(renderMenuItem)
                  }
                  {
                    index < menuGroups.length - 1 && (
                      <Separator borderColor="$gray6" marginVertical='$4' borderWidth="$0.5" />
                    )
                  }
                </YStack>
              ))
            }
          </Settings.Group>
        </Settings.Items>
      </Settings>

      <View padding='$4'>
        <AccountSwitcher />
      </View>
    </View >
  );
}


export default SideBar;
