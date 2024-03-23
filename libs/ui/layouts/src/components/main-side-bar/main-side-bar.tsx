import { useMultiLang } from '@zix/i18n';
import { useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';

import { LogOut } from '@tamagui/lucide-icons';
import { useThemeSetting } from '@tamagui/next-theme';
import { useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { ZixLinkButton } from '@zix/ui/common';
import { Separator, ThemeableStackProps, View, YStack } from 'tamagui';
import AccountSwitcher from '../account-switcher/account-switcher';
import { MenuItem } from './menu-item';
import { FlatList } from 'react-native';

export type MainSideBarProps = ThemeableStackProps & {
  //
}

type MenuItemType = {
  title: string
  icon: () => React.ReactNode
  href?: string
  count?: number
  onPress?: () => void
  subItems?: MenuItemType[]
}

export const MainSideBar: React.FC<MainSideBarProps> = (props) => {
  const { activeLang } = useMultiLang();
  const { activeRole, getUrlPrefix, logout } = useAuth()
  const themeSetting = useThemeSetting()

  const { data: shipmentsData } = useQuery({
    queryFn: () =>
      ShipmentService.fetchShipmentFilters({
        role: activeRole,
      }),
    queryKey: ['ShipmentService.fetchShipmentFilters', activeRole],
  });



  return (
    <View
      {...props}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      position='sticky'
      top={0}
      width={320}
      backgroundColor='$color3'
    >
      <YStack padding='$4' height='100vh'>
        <ZixLinkButton unstyled href='/'>
          <CustomIcon name={`web_logo_${activeLang}`} height={50} width={165} />
        </ZixLinkButton>

        <YStack flex={1} marginTop='$4' gap='$2'>
          <Separator borderColor="$color5" marginVertical='$4' borderWidth="$0.5" />

          <MenuItem
            title='Home'
            href={getUrlPrefix}
            icon={<CustomIcon name="home" />}
          />
          <MenuItem
            title='Orders'
            href={`${getUrlPrefix}/shipments`}
            icon={<CustomIcon name="orders" />}
            collapsible
          >
            <YStack theme='accent' backgroundColor='$color3' maxHeight='30vh'>
              <FlatList
                style={{ flex: 1 }}
                data={shipmentsData?.data}
                renderItem={({ item }) => (
                  <MenuItem
                    key={item.status}
                    title={item.status}
                    href={`${getUrlPrefix}/shipments?status=${item.status}`}
                    rightLabel={item.count?.toString()}
                  />
                )}
              />

            </YStack>
          </MenuItem>


          <MenuItem
            title='Jobs'
            href={`${getUrlPrefix}/jobs`}
            icon={<CustomIcon name="job" />}
          />

          <Separator borderColor="$color5" marginVertical='$4' borderWidth="$0.5" />
          <MenuItem
            title='Notifications'
            href={`${getUrlPrefix}/notifications`}
            icon={<CustomIcon name="notifications" />}
          />
          <MenuItem
            title='Chat'
            href={`${getUrlPrefix}/chat`}
            icon={<CustomIcon name="chat" />}
          />
          <Separator borderColor="$color5" marginVertical='$4' borderWidth="$0.5" />
          <MenuItem
            title='Theme'
            onPress={themeSetting.toggle}
            icon={<CustomIcon name="theme" />}
            rightLabel={themeSetting.current}
          />
          <MenuItem
            title='Logout'
            onPress={logout}
            icon={<LogOut />}
          />

        </YStack>
        <View padding='$4'>
          <AccountSwitcher />
        </View>
      </YStack>
    </View >
  );
}


export default MainSideBar;
