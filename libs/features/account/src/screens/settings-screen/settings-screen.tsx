import { IconProps } from '@tamagui/helpers-icon';
import { Languages } from '@tamagui/lucide-icons';
import { ActionSheet, ActionSheetRef, Settings } from '@zix/ui/common';
import { Paragraph, ScrollView, Theme, View, YStack, useMedia } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { usePathname } from '@zix/utils';
import { useMultiLang } from '@zix/i18n';
import { useThemeSetting } from '@zix/providers';
import { t } from 'i18next';
import { useCallback, useRef, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';

import { useAuth } from '@zix/services/auth';
import { useLink } from 'solito/link';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { UserService } from '@zix/api';
import { useRouter } from 'solito/router';

const brandColors = {
  twitter: '#1DA1F2',
};

export const SettingsScreen = () => {
  const media = useMedia();
  const pathname = usePathname();
  const router = useRouter();
  const { getUrlPrefix, isLoggedIn } = useAuth();
  const { languages, changeLanguage } = useMultiLang();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    setDropdownVisible(false);
  };

  const getUrl = useCallback(
    (path: string) => {
      return `${getUrlPrefix}/${path}`;
    },
    [getUrlPrefix],
  );

  const renderWebDropdown = () => (
    <View
      width={180}
      position="absolute"
      zIndex={1}
      backgroundColor="white"
      left={0}
      bottom={60}
      borderWidth={1.5}
      borderRadius={5}
    >
      {languages && languages?.length ? languages.map((lang, index) => (
        <View
          key={lang}
          onPress={() => handleLanguageChange(lang)}
          borderBottomWidth={0.5}
          backgroundColor={hoveredIndex === index ? 'black' : 'white'}
          cursor="pointer"
          padding={10}
          style={{
            color: hoveredIndex === index ? 'white' : 'black', // Change text color on hover
          }}
          onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
          onMouseLeave={() => setHoveredIndex(null)} // Reset hover on mouse leave
        >
          {t(`account:language.${lang}`)}
        </View>
      )) : null}
    </View>
  );

  const generalLink = useLink({
    href: media.sm
      ? getUrl('account/settings/general')
      : Platform.OS === 'web' ? getUrl('account/settings/general')
        : getUrl('account/settings'),
  });

  return (
    <>
      <AppHeader showBackButton title={t('account:settings.title')} />

      <YStack flex={1} gap="$2" justifyContent="space-between">
        <ScrollView>
          <Settings>
            <Settings.Items>
              {isLoggedIn && (
                <Settings.Group $gtSm={{ space: '$2' }}>
                  <Settings.Item
                    icon={(props: IconProps) => (
                      <Theme name='accent'>
                        <CustomIcon {...props} name="settings" color="$color9" />
                      </Theme>
                    )}
                    isActive={pathname === getUrl('account/settings/general')}
                    {...generalLink}
                    accentColor="$green9"
                  >
                    {t('account:general.title')}
                  </Settings.Item>
                </Settings.Group>
              )}

              <Settings.Group>
                <Settings.Item
                  icon={(props: IconProps) => (
                    <Theme name='accent'>
                      <CustomIcon name="secure" color="$color9" {...props} />
                    </Theme>
                  )}
                  isActive={pathname === '/privacy-policy'}
                  {...useLink({ href: '/privacy-policy' })}
                  accentColor="$purple9"
                >
                  {t('account:privacy_policy.title')}
                </Settings.Item>
                <Settings.Item
                  icon={(props: IconProps) => (
                    <Theme name='accent'>
                      <CustomIcon name="book" color="$color9" {...props} />
                    </Theme>
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
                    <Theme name='accent'>
                      <CustomIcon name="share" color="$color9" {...props} />
                    </Theme>
                  )}
                  onPress={() =>
                    Linking.openURL('https://x.com/sawaedlogistics')
                  }
                  accentColor={brandColors.twitter}
                >
                  {t('account:social.twitter_title')}
                </Settings.Item>
              </Settings.Group>

              <Settings.Group>
                {Platform.OS === 'web' ?
                  <SettingsWebLanguageAction
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                  /> : <SettingsLanguageAction />}
              </Settings.Group>
              {Platform.OS === 'web' && dropdownVisible && renderWebDropdown()}
              <Settings.Group>
                <SettingsThemeAction />
                {isLoggedIn &&
                  <>
                    <SettingsDeleteAccountAction />
                    <SettingsItemLogoutAction />
                  </>
                }

                {
                  !isLoggedIn &&
                  <>
                    <Settings.Item
                      icon={(props: IconProps) => (
                        <Theme name='accent'>
                          <CustomIcon name="followed" color="$color9" {...props} />
                        </Theme>
                      )}
                      onPress={() => router.push('/auth/login')}
                      accentColor="$green9"
                    >
                      {t('auth:sign_in')}
                    </Settings.Item>
                    <Settings.Item
                      icon={(props: IconProps) => (
                        <Theme name='accent'>
                          <CustomIcon name="account" color="$color9" {...props} />
                        </Theme>
                      )}
                      onPress={() => router.push('/auth/register')}
                      accentColor="$green9"
                    >
                      {t('auth:sign_up')}
                    </Settings.Item>
                  </>
                }
              </Settings.Group>
            </Settings.Items>
          </Settings>
        </ScrollView>
        {/*
      NOTE: you should probably get the actual native version here using https://www.npmjs.com/package/react-native-version-info
      we just did a simple package.json read since we want to keep things simple for the starter
       */}

        <Paragraph paddingVertical="$4" textAlign="center" theme="alt2">
          v1.0.0
        </Paragraph>
      </YStack>
    </>
  );
};

const SettingsWebLanguageAction = ({ onPress }) => {
  const { activeLang } = useMultiLang();

  return (
    <ScreenLayout>
      <Settings.Item
        icon={(props: IconProps) => (
          <Theme name='accent'>
            <Languages  {...props} color="$color9" />
          </Theme>
        )}
        onPress={onPress}
        rightLabel={t(`account:language.${activeLang}`).toString()}
      >
        {t('account:language.title')}
      </Settings.Item>
    </ScreenLayout>
  );
};

const SettingsLanguageAction = () => {
  const { activeLang, languages, changeLanguage } = useMultiLang();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const renderLanguages = () => (
    <ActionSheet
      ref={actionSheetRef}
      title={t('account:language.select_language')}
      actions={
        languages?.length
          ? languages.map((lang) => ({
            name: t(`account:language.${lang}`).toString(),
            onPress: () => {
              actionSheetRef.current?.close();
              changeLanguage(lang);
            },
          }))
          : []
      }
    />
  );

  return (
    <ScreenLayout>
      {renderLanguages()}
      <Settings.Item
        icon={(props: IconProps) => (
          <Theme name='accent'>
            <Languages  {...props} color="$color9" />
          </Theme>
        )}
        onPress={() => actionSheetRef.current?.open()}
        rightLabel={t(`account:language.${activeLang}`).toString()}
      >
        {t('account:language.title')}
      </Settings.Item>
    </ScreenLayout>
  );
};

const SettingsThemeAction = () => {
  const { toggle, current } = useThemeSetting();

  return (
    <Settings.Item
      icon={(props: IconProps) => (
        <Theme name='accent'>
          <CustomIcon name="theme" color="$color9" {...props} />
        </Theme>
      )}
      onPress={toggle}
      rightLabel={t(`account:theme.${current}`).toString()}
    >
      {t('account:theme.title')}
    </Settings.Item>
  );
};

const SettingsItemLogoutAction = () => {
  const { logout } = useAuth();

  return (
    <Settings.Item
      theme='error'
      icon={(props: IconProps) => (
        <CustomIcon name="logout" color="$color9" {...props} />
      )}
      accentColor="$color9"
      //onPress={() => logout()}
      onPress={async () => {
        Platform.OS === 'web' ? logout() :
          Alert.alert(
            `${t('common:sign-out')}`,
            `${t('common:sign-out-message')}`,
            [
              {
                text: `${t('common:sign-out')}`,
                onPress: () => logout(),
                style: 'cancel',
              },
              {
                text: `${t('common:cancel')}`,
                style: 'destructive',
              },
            ]
          )
      }}

    >
      {t('account:logout')}
    </Settings.Item>
  );
};
const SettingsDeleteAccountAction = () => {
  const { logout } = useAuth();

  return (
    <Settings.Item
      theme='error'
      icon={(props: IconProps) => (
        <CustomIcon name="secure" color="$color9" {...props} />
      )}
      accentColor="$color9"
      //onPress={() => logout()}
      onPress={async () => {
        Platform.OS === 'web' ? UserService.deleteAccount().then(() => logout()) :
          Alert.alert(
            `${t('common:delete-account')}`,
            `${t('common:delete-account-message')}`,
            [
              {
                text: `${t('common:delete-account')}`,
                onPress: () => UserService.deleteAccount()
                  .then(() => logout()),
                style: 'cancel',
              },
              {
                text: `${t('common:cancel')}`,
                style: 'destructive',
              },
            ]
          )
      }}

    >
      {t('common:delete-account')}
    </Settings.Item>
  );
};

export default SettingsScreen;
