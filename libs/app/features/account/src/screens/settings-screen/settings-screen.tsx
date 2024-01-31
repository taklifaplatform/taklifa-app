import { IconProps } from '@tamagui/helpers-icon';
import { Languages } from '@tamagui/lucide-icons';
import { ActionSheet, ActionSheetRef, Settings } from '@zix/app/ui/common';
import { Paragraph, ScrollView, YStack, useMedia } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { useThemeSetting } from '@zix/core/providers';
import { useSupabase } from '@zix/core/supabase';
import { usePathname } from '@zix/core/utils';
import { useMultiLang } from '@zix/i18n';
import { t } from 'i18next';
import { useRef } from 'react';

import { useLink } from 'solito/link';

const brandColors = {
  twitter: '#1DA1F2'
};

export const SettingsScreen = () => {
  const media = useMedia();
  const pathname = usePathname();
  //
  return (
    <YStack flex={1} gap="$2" justifyContent="space-between">
      <ScrollView>
        <Settings marginTop="$6">
          <Settings.Items>
            <Settings.Group $gtSm={{ space: '$2' }}>
              <Settings.Item
                icon={(props: IconProps) => (
                  <CustomIcon name="settings" color="$color5" {...props} />
                )}
                isActive={pathname === '/account/settings/general'}
                {...useLink({
                  href: media.sm
                    ? '/account/settings/general'
                    : '/account/settings'
                })}
                accentColor="$green9"
              >
                {t('account:general.title')}
              </Settings.Item>
              <Settings.Item
                icon={(props: IconProps) => (
                  <CustomIcon name="lock" color="$color5" {...props} />
                )}
                isActive={pathname === '/account/settings/change-password'}
                {...useLink({ href: '/account/settings/change-password' })}
                accentColor="$green9"
              >
                {t('auth:change_password.title')}
              </Settings.Item>
              <Settings.Item
                icon={(props: IconProps) => (
                  <CustomIcon name="mail" color="$color5" {...props} />
                )}
                isActive={pathname === '/account/settings/change-email'}
                {...useLink({ href: '/account/settings/change-email' })}
                accentColor="$green9"
              >
                {t('account:change_email.title')}
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

            <Settings.Group>
              <Settings.Item
                icon={(props: IconProps) => (
                  <CustomIcon name="secure" color="$color5" {...props} />
                )}
                isActive={pathname === '/privacy-policy'}
                {...useLink({ href: '/privacy-policy' })}
                accentColor="$purple9"
              >
                {t('account:privacy_policy.title')}
              </Settings.Item>
              <Settings.Item
                icon={(props: IconProps) => (
                  <CustomIcon name="book" color="$color5" {...props} />
                )}
                isActive={pathname === '/terms-of-service'}
                {...useLink({ href: '/terms-of-service' })}
                accentColor="$purple9"
              >
                {t('account:terms_of_service.title')}
              </Settings.Item>
            </Settings.Group>

            <Settings.Group>
              <Settings.Item
                icon={(props: IconProps) => (
                  <CustomIcon name="share" color="$color5" {...props} />
                )}
                onPress={() => redirect('https://twitter.com/zixdev')}
                accentColor={brandColors.twitter}
              >
                {t('account:social.twitter_title')}
              </Settings.Item>
            </Settings.Group>

            <Settings.Group>
              <SettingsLanguageAction />
            </Settings.Group>

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
      <Paragraph paddingVertical="$2" textAlign="center" theme="alt2">
        v1.0.0
      </Paragraph>
    </YStack>
  );
};

const SettingsLanguageAction = () => {
  const { activeLang, languages, changeLanguage } = useMultiLang();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const renderLanguages = () => (
    <ActionSheet
      ref={actionSheetRef}
      title={t('account:language.select_language')}
      actions={languages.map((lang) => ({
        name: t(`account:language.${lang}`).toString(),
        icon: <Languages size="$2" color="$color10" />,
        onPress: () => {
          actionSheetRef.current?.close();
          changeLanguage(lang);
        }
      }))}
    />
  );

  return (
    <>
      {renderLanguages()}
      <Settings.Item
        icon={(props: IconProps) => (
          <CustomIcon name="theme" color="$color5" {...props} />
        )}
        onPress={() => actionSheetRef.current?.open()}
        rightLabel={t(`account:language.${activeLang}`).toString()}
      >
        {t('account:language.title')}
      </Settings.Item>
    </>
  );
};

const SettingsThemeAction = () => {
  const { toggle, current } = useThemeSetting();

  return (
    <Settings.Item
      icon={(props: IconProps) => (
        <CustomIcon name="theme" color="$color5" {...props} />
      )}
      accentColor="$blue9"
      onPress={toggle}
      rightLabel={t(`account:theme.${current}`).toString()}
    >
      {t('account:theme.title')}
    </Settings.Item>
  );
};

const SettingsItemLogoutAction = () => {
  const supabase = useSupabase();

  return (
    <Settings.Item
      icon={(props: IconProps) => (
        <CustomIcon name="logout" color="red" {...props} />
      )}
      accentColor="$red9"
      onPress={() => supabase.auth.signOut()}
    >
      {t('account:logout')}
    </Settings.Item>
  );
};

export default SettingsScreen;
