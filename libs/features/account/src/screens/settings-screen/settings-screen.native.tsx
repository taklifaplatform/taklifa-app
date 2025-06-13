import { IconProps } from '@tamagui/helpers-icon';
import { Languages } from '@tamagui/lucide-icons';
import { useMultiLang } from '@zix/i18n';
import { useThemeSetting } from '@zix/providers';
import { ActionSheet, ActionSheetRef, Settings } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { usePathname } from '@zix/utils';
import * as Application from 'expo-application';
import * as Updates from 'expo-updates';
import { t } from 'i18next';
import { useCallback, useRef, useState } from 'react';
import { Alert, Linking, Platform, TouchableOpacity } from 'react-native';
import { Paragraph, ScrollView, Text, Theme, View, XStack, YStack } from 'tamagui';

import { UserService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import moment from 'moment';
import { useRouter } from 'solito/router';

const brandColors = {
  twitter: '#1DA1F2',
};

export const SettingsScreen = () => {
  useMixpanel('Settings Screen view')
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

  return (
    <>
      <AppHeader showBackButton title={t('account:settings.title')} />

      <YStack flex={1} gap="$2" justifyContent="space-between">
        <ScrollView>
          <Settings>
            <Settings.Items>
              {(isLoggedIn && Platform.OS === 'web') && (
                <Settings.Group $gtSm={{ space: '$2' }}>
                  <Settings.Item
                    icon={(props: IconProps) => (
                      <Theme name='accent'>
                        <CustomIcon {...props} name="settings" color="$color9" />
                      </Theme>
                    )}
                    isActive={pathname === getUrl('account/settings/general')}
                    href={getUrl('account/settings/general')}
                    onPress={() => router.push(getUrl('account/settings'))}
                    accentColor="$green9"
                  >
                    {t('account:general.title')}
                  </Settings.Item>
                </Settings.Group>
              )}
              {isLoggedIn &&
                <Settings.Group>
                  <Settings.Item
                    icon={(props: IconProps) => (
                      <Theme name='accent'>
                        <CustomIcon name="lock" color="$color9" {...props} />
                      </Theme>
                    )}
                    href={getUrl('account/settings/change-password')}
                    onPress={() => router.push(getUrl('account/settings/change-password'))}
                    isActive={
                      pathname === getUrl('account/settings/change-password')
                    }
                    accentColor="$green9"
                  >
                    {t('auth:change_password.title')}
                  </Settings.Item>
                  <Settings.Item
                    icon={(props: IconProps) => (
                      <Theme name='accent'>
                        <CustomIcon name="mail" color="$color9" {...props} />
                      </Theme>
                    )}
                    isActive={
                      pathname === getUrl('account/settings/change-email')
                    }
                    href={getUrl('account/settings/change-email')}
                    onPress={() => router.push(getUrl('account/settings/change-email'))}
                    accentColor="$green9"
                  >
                    {t('account:change_email.title')}
                  </Settings.Item>
                </Settings.Group>}
              <Settings.Group>
                <Settings.Item
                  icon={(props: IconProps) => (
                    <Theme name='accent'>
                      <CustomIcon name="secure" color="$color9" {...props} />
                    </Theme>
                  )}
                  isActive={pathname === '/privacy-policy'}
                  onPress={() => router.push('/privacy-policy')}
                  href={'/privacy-policy'}
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
                  onPress={() => router.push('/terms-of-service')}
                  href={'/terms-of-service'}
                  accentColor="$purple9"
                >
                  {t('account:terms_of_service.title')}
                </Settings.Item>
              </Settings.Group>
              {/* 
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
              </Settings.Group> */}

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

        <XStack justifyContent="center" alignItems="center">
          <Paragraph fontSize="$1" paddingVertical="$1" theme="alt2">
            <Text fontWeight="bold">{t('common:version-number')}:</Text> {Application.nativeApplicationVersion} ({Application.nativeBuildVersion})
            {'\n'}
            <Text fontWeight="bold">{t('common:version-identifier')}:</Text> {Updates.updateId?.substring(0, 8) ?? '-'} ({Updates.channel ?? '-'})
            {'\n'}
            <Text fontWeight="bold">{t('common:version-date')}:</Text> {moment(Updates.createdAt ?? new Date()).format('YYYY-MM-DD HH:mm:ss')}
            {/* v1.2.4 (EF-103-2) */}
          </Paragraph>
        </XStack>
        <TouchableOpacity onPress={() => Linking.openURL('https://zixdev.com?ref=sawaeed')}  >
          <Paragraph
            paddingBottom="$4"
            textAlign="center"
            theme="alt1"
            fontSize="$1"
          >
            {t('common:built-with-love-by')}
          </Paragraph>
        </TouchableOpacity>
      </YStack >
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
