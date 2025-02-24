import { useMultiLang } from '@zix/i18n';
import { USER_ROLES, useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';

import { useThemeSetting } from '@tamagui/next-theme';
import { useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { ZixLinkButton } from '@zix/ui/common';
import { FlatList } from 'react-native';
import { Separator, ThemeableStackProps, View, YStack } from 'tamagui';
import AccountSwitcher from '../account-switcher/account-switcher';
import { MenuItem } from './menu-item';
import { useRouter } from "solito/router";
import { usePathname } from '@zix/utils';

export type MainSideBarProps = ThemeableStackProps & {
  //
}

export const MainSideBar: React.FC<MainSideBarProps> = (props) => {
  const { activeLang } = useMultiLang();
  const { activeRole, getUrlPrefix, isLoggedIn } = useAuth()
  const { current } = useThemeSetting();
   const router = useRouter()
    const pathname = usePathname()
  const iconColor = current !== 'dark' ? '$color11'  : '$color12';
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
            icon={<CustomIcon name="home" color={iconColor}/>}
          />
          {isLoggedIn && <MenuItem
            title='Orders'
            href={`${getUrlPrefix}/shipments`}
            icon={<CustomIcon name="orders" color={iconColor}/>}
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
          </MenuItem>}


          {isLoggedIn &&
            activeRole !== USER_ROLES.customer && (
              <MenuItem
                title='Jobs'
                href={`${getUrlPrefix}/jobs`}
                icon={<CustomIcon name="job" color={iconColor}/>}
              />
            )
          }

          {isLoggedIn &&
            activeRole === USER_ROLES.customer && (
              <MenuItem
                title='Stores'
                href={`${getUrlPrefix}/stores`}
                icon={<CustomIcon name="store" color={iconColor}/>}
              />
            )
          }


          {isLoggedIn && <Separator borderColor="$color5" marginVertical='$4' borderWidth="$0.5" />}
          {isLoggedIn && <MenuItem
            title='Notifications'
            href={`${getUrlPrefix}/notifications`}
            icon={<CustomIcon name="notifications" color={iconColor}/>}
          />}
          {isLoggedIn && <MenuItem
            title='Chat'
            href={`${getUrlPrefix}/chat`}
            icon={<CustomIcon name="chat" color={iconColor}/>}
          />}
          <Separator borderColor="$color5" marginVertical='$4' borderWidth="$0.5" />

          <MenuItem
            title='Settings'
            href={`${getUrlPrefix}/account/settings`}
            icon={<CustomIcon name='settings' color={iconColor}/>}
          />

        </YStack>
        <View padding='$4'>
          {isLoggedIn && <AccountSwitcher />}
        </View>
      </YStack>
    </View >
  );
}


export default MainSideBar;
