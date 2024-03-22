import { useMultiLang } from '@zix/i18n';
import { useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import React, { useMemo } from 'react';

import { IconProps } from '@tamagui/helpers-icon';
import { LogOut } from '@tamagui/lucide-icons';
import { useThemeSetting } from '@tamagui/next-theme';
import { ZixLinkButton } from '@zix/ui/common';
import { usePathname } from '@zix/utils';
import { useRouter } from 'solito/router';
import { Button, Separator, Text, ThemeableStackProps, View, XStack, YStack } from 'tamagui';
import AccountSwitcher from '../account-switcher/account-switcher';

export type MainSideBarProps = ThemeableStackProps & {
  //
}

type MenuItemType = {
  title: string
  icon: () => React.ReactNode
  href?: string
  count?: number
  onPress?: () => void
}

export const MainSideBar: React.FC<MainSideBarProps> = (props) => {
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
          href: `${getUrlPrefix}/notifications`,
          count: 12,
        },
        {
          title: 'Chat',
          icon: (props: IconProps) => <CustomIcon name="chat" {...props} />,
          href: `${getUrlPrefix}/chat`,
          count: 5,
        },
      ],
      [
        {
          title: 'Theme',
          icon: (props: IconProps) => <CustomIcon name="theme" {...props} />,
          onPress: toggleTheme,
          count: current
        },
      ],
      [
        {
          title: 'Logout',
          icon: (props: IconProps) => <LogOut {...props} />,
          onPress: logout
        },
      ],
    ]

  }, [activeRole, getUrlPrefix])

  const renderMenuItem = (item: MenuItemType, index: number) => (
    <Button
      theme='accent'
      key={`${index}-${item.title}`}
      backgroundColor={pathname === item.href ? '$backgroundFocus' : 'transparent'}
      onPress={() => item?.onPress ? item.onPress() : item.href && router.push(item.href)}
    >
      <XStack alignItems='center' justifyContent='space-between' flex={1}>
        <XStack alignItems='center'>
          <View width='$3'>
            {item.icon?.()}
          </View>
          <Text>
            {item.title}
          </Text>
        </XStack>
        <View>
          {
            item.count && (
              <View
                backgroundColor='$color1'
                padding='$2'
                paddingHorizontal='$4'
                borderRadius='$8'
              >
                <Text>{item.count}</Text>
              </View>
            )
          }
        </View>

      </XStack>
    </Button>
  )

  return (
    <View
      {...props}
      position='sticky'
      top={0} bottom={0} left={0} width={320} maxHeight='100vh' backgroundColor='$color3'>
      <YStack padding='$4' gap='$10' justifyContent='space-between' flex={1}>
        <ZixLinkButton unstyled href='/'>
          <CustomIcon name={`web_logo_${activeLang}`} height={50} width={165} />
        </ZixLinkButton>

        <View flex={1}>
          {
            menuGroups.map((menuItems, index) => (
              <YStack key={index} gap='$2'>
                {
                  menuItems.map(renderMenuItem)
                }
                {
                  index < menuGroups.length - 1 && (
                    <Separator borderColor="$color5" marginVertical='$4' borderWidth="$0.5" />
                  )
                }
              </YStack>
            ))
          }

        </View>
        <View padding='$4'>
          <AccountSwitcher />
        </View>
      </YStack>
    </View >
  );
}


export default MainSideBar;
