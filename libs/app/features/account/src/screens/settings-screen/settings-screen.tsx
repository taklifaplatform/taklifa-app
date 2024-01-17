import {
  Book,
  Cog,
  Info,
  Lock,
  LogOut,
  Mail,
  Moon,
  Twitter
} from '@tamagui/lucide-icons';
import { Settings } from '@zix/app/ui/common';
import {
  Paragraph,
  ScrollView,
  Separator,
  YStack,
  isWeb,
  useMedia
} from '@zix/app/ui/core';
import { useThemeSetting } from '@zix/core/providers';
import { useSupabase } from '@zix/core/supabase';
import { usePathname } from '@zix/core/utils';

import { useLink } from 'solito/link';

const brandColors = {
  twitter: '#1DA1F2'
};

export const SettingsScreen = () => {
  const media = useMedia();
  const pathname = usePathname();

  return (
    <YStack flex={1} gap="$2" justifyContent="space-between">
      <ScrollView>
        <Settings marginTop="$6">
          <Settings.Items>
            <Settings.Group $gtSm={{ space: '$2' }}>
              <Settings.Item
                icon={Cog}
                isActive={
                  pathname === '/account/settings' || pathname === 'settings/general'
                }
                {...useLink({
                  href: media.sm ? '/account/settings/general' : '/account/settings'
                })}
                accentColor="$green9"
              >
                General
              </Settings.Item>
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
              {/* removing about from web since landing pages are more common on web - feel free to add back if needed */}
              {!isWeb && (
                // isWeb is a constant so this isn't really a conditional hook
                // eslint-disable-next-line react-hooks/rules-of-hooks
                <Settings.Item
                  icon={Info}
                  {...useLink({ href: '/about' })}
                  accentColor="$blue9"
                >
                  About
                </Settings.Item>
              )}
            </Settings.Group>
            <Separator
              borderColor="$color3"
              marginHorizontal="$-4"
              borderWidth="$0.25"
            />
            <Settings.Group>
              <Settings.Item
                icon={Twitter}
                onPress={() => redirect('https://twitter.com/zixdev')}
                accentColor={brandColors.twitter}
              >
                Our Twitter
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
      NOTE: you should probably get the actual native version here using https://www.npmjs.com/package/react-native-version-info
      we just did a simple package.json read since we want to keep things simple for the starter
       */}
      <Paragraph paddingVertical="$2" ta="center" theme="alt2">
        v1.0.0
      </Paragraph>
    </YStack>
  );
};

const SettingsThemeAction = () => {
  const { toggle, current } = useThemeSetting();

  return (
    <Settings.Item
      icon={Moon}
      accentColor="$blue9"
      onPress={toggle}
      rightLabel={current}
      // <Switch
      //   size="$4"
      //   checked={resolvedTheme === 'dark'}
      //   onCheckedChange={() => set(resolvedTheme === 'dark' ? 'light' : 'dark')}
      // >
      //   <Switch.Thumb animation="100ms" />
      // </Switch>
    >
      Theme
    </Settings.Item>
  );
};

const SettingsItemLogoutAction = () => {
  const supabase = useSupabase();

  return (
    <Settings.Item
      icon={LogOut}
      accentColor="$red9"
      onPress={() => supabase.auth.signOut()}
    >
      Log Out
    </Settings.Item>
  );
};

export default SettingsScreen;
