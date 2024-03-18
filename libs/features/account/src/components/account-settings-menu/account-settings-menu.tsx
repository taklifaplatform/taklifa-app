import { Book, CircleUser, Lock, LogOut, Mail, Moon, UserRoundCog } from '@tamagui/lucide-icons'

import { useThemeSetting } from '@tamagui/next-theme'
import { useAuth } from '@zix/services/auth'
import { Settings } from '@zix/ui/common'
import { usePathname } from '@zix/utils'
import { useLink } from 'solito/link'
import {
  Paragraph,
  ScrollView,
  Separator,
  YStack
} from 'tamagui'


export const AccountSettingsMenu = () => {
  const pathname = usePathname()

  return (
    <YStack flex={1} gap="$2" justifyContent="space-between">
      <ScrollView>
        <Settings marginTop="$6">
          <Settings.Items>
            <Settings.Group $gtSm={{ space: '$2' }}>
              <Settings.Item
                icon={CircleUser}
                isActive={
                  pathname === '/account'
                }
                {...useLink({
                  href: '/account'
                })}
                accentColor="$green9"
              >
                Profile
              </Settings.Item>
              <Settings.Item
                icon={UserRoundCog}
                isActive={pathname === '/account/edit'}
                {...useLink({ href: '/account/edit' })}
                accentColor="$green9"
              >
                Edit Profile
              </Settings.Item>
            </Settings.Group>
            <Separator
              borderColor="$color3"
              marginHorizontal="$-4"
              borderWidth="$0.25"
            />
            <Settings.Group $gtSm={{ space: '$2' }}>
              <Settings.Item
                icon={Lock}
                isActive={pathname === '/account/settings/change-password'}
                {...useLink({ href: '/account/settings/change-password' })}
                accentColor="$green9"
              >
                Change Password
              </Settings.Item>
              <Settings.Item
                icon={Mail}
                isActive={pathname === '/account/settings/change-email'}
                {...useLink({ href: '/account/settings/change-email' })}
                accentColor="$green9"
              >
                Change Email
              </Settings.Item>
              {/* <Settings.Item
                icon={Bell}
                isActive={pathname === '/account/settings/notifications'}
                {...useLink({ href: '/account/settings/notifications' })}
                accentColor="$orange9"
              >
                Notifications
              </Settings.Item> */}
            </Settings.Group>
            <Separator
              borderColor="$color3"
              marginHorizontal="$-4"
              borderWidth="$0.25"
            />
            <Settings.Group>
              <Settings.Item
                icon={Book}
                isActive={pathname === '/privacy-policy'}
                {...useLink({ href: '/privacy-policy' })}
                accentColor="$purple9"
              >
                Privacy Policy
              </Settings.Item>
              <Settings.Item
                icon={Book}
                isActive={pathname === '/terms-of-service'}
                {...useLink({ href: '/terms-of-service' })}
                accentColor="$purple9"
              >
                Terms Of Service
              </Settings.Item>
            </Settings.Group>
            <Separator
              borderColor="$color3"
              marginHorizontal="$-4"
              borderWidth="$0.25"
            />
            <Settings.Group>
              <SettingsThemeAction />
              <SettingsItemLogoutAction />
            </Settings.Group>
          </Settings.Items>
        </Settings>
      </ScrollView>
      {/*
      TODO: use a better way to display version
       */}
      <Paragraph paddingVertical="$2" textAlign="center" theme="alt2">
        V1.0.0
      </Paragraph>
    </YStack>
  )
}

const SettingsThemeAction = () => {
  const { toggle, current } = useThemeSetting()

  return (
    <Settings.Item icon={Moon} onPress={toggle} rightLabel={current}>
      Theme
    </Settings.Item>
  )
}

const SettingsItemLogoutAction = () => {
  const { logout } = useAuth();

  return (
    <Settings.Item icon={LogOut} onPress={() => logout()}>
      Log Out
    </Settings.Item>
  )
}

export default AccountSettingsMenu;
