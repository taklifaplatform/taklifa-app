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
import { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, Linking, Platform, TouchableOpacity } from 'react-native';
import {
  Paragraph,
  ScrollView,
  Switch,
  Text,
  Theme,
  View,
  XStack,
  YStack,
} from 'tamagui';

import { UserService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import moment from 'moment';
import { useRouter } from 'solito/router';

const brandColors = {
  twitter: '#1DA1F2',
};

export const SettingsScreen = () => {
  useMixpanel('Settings Screen view');
  const pathname = usePathname();
  const router = useRouter();
  const { getUrlPrefix, isLoggedIn, logout, user } = useAuth();
  const { languages, changeLanguage } = useMultiLang();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isNotificationsPaused, setIsNotificationsPaused] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    setDropdownVisible(false);
  };
  const userRoles = useMemo(() => {
    return user?.roles?.filter((role) => !role.name?.includes('company'));
  }, [user]);
  const roleNames = useMemo(() => {
    return userRoles?.map((role) => role.name);
  }, [userRoles, user]);
  const getUrl = useCallback(
    (path: string) => {
      return `${getUrlPrefix}/${path}`;
    },
    [getUrlPrefix],
  );

  const onAddAccount = useCallback(() => {
    setSheetOpen(false);
    router.push('/auth/register');
  }, [roleNames, router]);

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
      {languages && languages?.length
        ? languages.map((lang, index) => (
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
        ))
        : null}
    </View>
  );

  return (
    <>
      <AppHeader showBackButton title={t('account:settings.title')} />
      <YStack flex={1} justifyContent="space-between">
        <ScrollView>
          <Settings>
            <Settings.Items>

              {isLoggedIn && (
                <>
                  <XStack paddingHorizontal="$6">
                    <Text fontSize={10}>{t('account:account_settings.title')}</Text>
                  </XStack>
                  <Settings.Group
                    backgroundColor="$background"
                    borderRadius="$2"
                    padding="$1"
                  >
                    {/* Change Password */}
                    <Settings.Item
                      icon={(props: IconProps) => (
                        <Theme name="accent">
                          <CustomIcon
                            name="lock"
                            color="$color10"
                            {...props}
                            size={17}
                          />
                        </Theme>
                      )}
                      href={getUrl('account/settings/change-password')}
                      onPress={() =>
                        router.push(getUrl('account/settings/change-password'))
                      }
                      isActive={
                        pathname === getUrl('account/settings/change-password')
                      }
                      accentColor="$green9"
                    >
                      <Text fontSize="$1" fontWeight="bold">
                        {t('account:change_password.title')}
                      </Text>
                    </Settings.Item>
                    {/* Change Email */}
                    <Settings.Item
                      icon={(props: IconProps) => (
                        <Theme name="accent">
                          <CustomIcon
                            name="mail"
                            color="$color10"
                            {...props}
                            size={17}
                          />
                        </Theme>
                      )}
                      isActive={
                        pathname === getUrl('account/settings/change-email')
                      }
                      href={getUrl('account/settings/change-email')}
                      onPress={() =>
                        router.push(getUrl('account/settings/change-email'))
                      }
                      accentColor="$green9"
                    >
                      <Text fontSize="$1" fontWeight="bold">
                        {t('account:change_email.title')}
                      </Text>
                    </Settings.Item>
                    {/* Pay Fees */}
                    {/* <Settings.Item
                      icon={(props: IconProps) => (
                        <Theme name="accent">
                          <CustomIcon
                            name="payments"
                            color="$color10"
                            {...props}
                            size={17}
                          />
                        </Theme>
                      )}
                      // onPress={() =>
                      //   router.push(getUrl('account/settings/change-email'))
                      // }
                      accentColor="$green9"
                    >
                      <Text fontSize="$1" fontWeight="bold">
                        {t('account:pay_fees.title')}
                      </Text>
                    </Settings.Item> */}
                    {/* <Settings.Item
                      icon={(props: IconProps) => (
                        <Theme name="accent">
                          <CustomIcon
                            name="app-badging"
                            color="$color10"
                            {...props}
                            size={17}
                          />
                        </Theme>
                      )}
                      accentColor="$green9"
                    >
                      <XStack
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                      >
                        <Text fontSize="$1" fontWeight="bold">
                          {t('account:activity_status.title')}
                        </Text>
                        <XStack
                          borderRadius="$10"
                          backgroundColor="#34C759"
                          paddingHorizontal="$3"
                          paddingVertical="$1.5"
                        >
                          <Text
                            fontSize={10}
                            textTransform="capitalize"
                            color="white"
                          >
                            {t('account:active')}
                          </Text>
                        </XStack>
                      </XStack>
                    </Settings.Item> */}
                  </Settings.Group>
                </>
              )}
              {/* <XStack paddingHorizontal="$6">
                <Text fontSize={10}>{t('account:notifications.title')}</Text>
              </XStack>
              <Settings.Group
                backgroundColor="$background"
                borderRadius="$2"
                padding="$1"
              >
                <Settings.Item
                  hideRightChevron
                  paddingVertical="$2"
                  icon={(props: IconProps) => (
                    <Theme name="accent">
                      <CustomIcon
                        name="notifications-active"
                        color="$color10"
                        {...props}
                        size={17}
                      />
                    </Theme>
                  )}
                  accentColor="$green9"
                >
                  <XStack
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Text fontSize="$1" fontWeight="bold">
                      {t('account:notifications.pause_notifications')}
                    </Text>
                    <NotificationSwitch />
                  </XStack>
                </Settings.Item>
              </Settings.Group> */}

              <XStack paddingHorizontal="$6">
                <Text fontSize={10}>
                  {t('account:screen_and_language.title')}
                </Text>
              </XStack>

              <Settings.Group>
                <SettingsThemeAction />
                {/* Language */}
                {Platform.OS === 'web' ? (
                  <SettingsWebLanguageAction
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                  />
                ) : (
                  <SettingsLanguageAction />
                )}
              </Settings.Group>

              <XStack paddingHorizontal="$6">
                <Text fontSize={10}>{t('account:more_information.title')}</Text>
              </XStack>

              <Settings.Group>
                {/* Privacy Policy */}
                <Settings.Item
                  icon={(props: IconProps) => (
                    <Theme name="accent">
                      <CustomIcon
                        name="secure"
                        color="$color10"
                        {...props}
                        size={17}
                      />
                    </Theme>
                  )}
                  isActive={pathname === '/privacy-policy'}
                  onPress={() => router.push('/privacy-policy')}
                  href={'/privacy-policy'}
                  accentColor="$purple9"
                >
                  <Text fontSize="$1" fontWeight="bold">
                    {t('account:privacy_policy.title')}
                  </Text>
                </Settings.Item>
                {/* Terms of Service */}
                <Settings.Item
                  icon={(props: IconProps) => (
                    <Theme name="accent">
                      <CustomIcon
                        name="book"
                        color="$color10"
                        {...props}
                        size={17}
                      />
                    </Theme>
                  )}
                  isActive={pathname === '/terms-of-service'}
                  onPress={() => router.push('/terms-of-service')}
                  href={'/terms-of-service'}
                  accentColor="$purple9"
                >
                  <Text fontSize="$1" fontWeight="bold">
                    {t('account:terms_of_service.title')}
                  </Text>
                </Settings.Item>
                {/* About Us */}
                {/* <Settings.Item
                  icon={(props: IconProps) => (
                    <Theme name="accent">
                      <CustomIcon
                        name="info"
                        color="$color10"
                        {...props}
                        size={17}
                      />
                    </Theme>
                  )}
                  // isActive={pathname === '/terms-of-service'}
                  // onPress={() => router.push('/terms-of-service')}
                  // href={'/terms-of-service'}
                  accentColor="$purple9"
                >
                  <Text fontSize="$1" fontWeight="bold">
                    {t('account:about_us.title')}
                  </Text>
                </Settings.Item> */}
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

              <XStack paddingHorizontal="$6">
                <Text fontSize={10}>{t('account:login.title')}</Text>
              </XStack>

              <Settings.Group
                backgroundColor="$background"
                borderRadius="$2"
                padding="$1"
              >
                {/* Add Account */}
                <Settings.Item
                  icon={(props: IconProps) => (
                    <Theme name="accent">
                      <CustomIcon
                        name="users"
                        color="$color10"
                        {...props}
                        size={20}
                      />
                    </Theme>
                  )}
                  onPress={onAddAccount}
                  accentColor="#FFD600"
                >
                  <Text fontSize="$1" fontWeight="bold">
                    {t('account:add_account.title')}
                  </Text>
                </Settings.Item>
                {/* Logout */}
                {isLoggedIn ? <SettingsItemLogoutAction /> : (
                  <Settings.Item
                    icon={(props: IconProps) => (
                      <Theme name="accent">
                        <CustomIcon name="users" color="$color9" {...props} size={17} />
                      </Theme>
                    )}
                    onPress={() => router.push('/auth/login')}
                    accentColor="#FFD600"
                  >
                    <Text fontSize="$1" fontWeight="bold">
                      {t('account:login.title')}
                    </Text>
                  </Settings.Item>
                )}
              </Settings.Group>
              <Settings.Group>
                {/* Delete Account */}
                {isLoggedIn && <SettingsDeleteAccountAction />}
              </Settings.Group>
            </Settings.Items>
          </Settings>
        </ScrollView>
        {/*
      NOTE: you should probably get the actual native version here using https://www.npmjs.com/package/react-native-version-info
      we just did a simple package.json read since we want to keep things simple for the starter
       */}

        <XStack justifyContent="center" alignItems="center">
          {/* About Us */}
          {/* Version */}
          <Paragraph
            fontSize="$1"
            paddingVertical="$1"
            theme="alt2"
            textAlign="center"
          >
            <Text fontWeight="bold">{t('common:version-number')}:</Text>{' '}
            {Application.nativeApplicationVersion} (
            {Application.nativeBuildVersion}){'\n'}
            <Text fontWeight="bold" textAlign="center">
              {t('common:version-identifier')}:
            </Text>{' '}
            {Updates.updateId?.substring(0, 8) ?? '-'} ({Updates.channel ?? '-'}
            ){'\n'}
            <Text fontWeight="bold">{t('common:version-date')}:</Text>{' '}
            {moment(Updates.createdAt ?? new Date()).format(
              'YYYY-MM-DD HH:mm:ss',
            )}
            {/* v1.2.4 (EF-103-2) */}
          </Paragraph>
        </XStack>
        {/* Built with love by */}
        <TouchableOpacity
          onPress={() => Linking.openURL('https://zixdev.com?ref=sawaeed')}
        >
          <Paragraph
            paddingBottom="$4"
            textAlign="center"
            theme="alt1"
            fontSize="$1"
          >
            {t('common:built-with-love-by')}
          </Paragraph>
        </TouchableOpacity>
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
          <Theme name="accent">
            <Languages {...props} color="$color9" />
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
          <Theme name="accent">
            <Languages {...props} color="$color9" />
          </Theme>
        )}
        onPress={() => actionSheetRef.current?.open()}
        rightLabel={t(`account:language.${activeLang}`).toString()}
      >
        <Text fontSize="$1" fontWeight="bold">
          {t('account:language.title')}
        </Text>
      </Settings.Item>
    </ScreenLayout>
  );
};

const SettingsThemeAction = () => {
  const { toggle, current } = useThemeSetting();

  return (
    <Settings.Item
      icon={(props: IconProps) => (
        <Theme name="accent">
          <CustomIcon name="theme" color="$color9" {...props} size={17} />
        </Theme>
      )}
      onPress={toggle}
      rightLabel={t(`account:theme.${current}`).toString()}
    >
      <Text fontSize="$1" fontWeight="bold">
        {t('account:theme.title')}
      </Text>
    </Settings.Item>
  );
};

const SettingsItemLogoutAction = () => {
  const { logout } = useAuth();

  return (
    <Settings.Item
      icon={(props: IconProps) => (
        <Theme name="accent">
          <CustomIcon name="logout" color="$color9" {...props} size={17} />
        </Theme>
      )}
      accentColor="$color9"
      //onPress={() => logout()}
      onPress={async () => {
        Platform.OS === 'web'
          ? logout()
          : Alert.alert(
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
            ],
          );
      }}
    >
      <Text fontSize="$1" fontWeight="bold">
        {t('account:logout')}
      </Text>
    </Settings.Item>
  );
};
const SettingsDeleteAccountAction = () => {
  const { logout } = useAuth();

  return (
    <Settings.Item
      theme="error"
      backgroundColor="$color2"
      icon={(props: IconProps) => (
        <CustomIcon name="delete" color="$color10" {...props} size={17} />
      )}
      accentColor="$color9"
      //onPress={() => logout()}
      onPress={async () => {
        Platform.OS === 'web'
          ? UserService.deleteAccount().then(() => logout())
          : Alert.alert(
            `${t('common:delete-account')}`,
            `${t('common:delete-account-message')}`,
            [
              {
                text: `${t('common:delete-account')}`,
                onPress: () =>
                  UserService.deleteAccount().then(() => logout()),
                style: 'cancel',
              },
              {
                text: `${t('common:cancel')}`,
                style: 'destructive',
              },
            ],
          );
      }}
    >
      <Text fontSize="$1" fontWeight="bold" color="$color10">
        {t('common:delete-account')}
      </Text>
    </Settings.Item>
  );
};
export function NotificationSwitch() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <XStack alignItems="center" gap="$4">
      <Switch
        id="notification-switch"
        size="$1.5"
        checked={isChecked}
        onCheckedChange={setIsChecked}
        backgroundColor={isChecked ? '$color3' : '$color8'}
        borderColor={isChecked ? '#EB2355' : '$color3'}
        borderWidth={0.25}
      >
        <Switch.Thumb
          theme="accent"
          animation="quicker"
          backgroundColor="$color8"
          width={20}
          height={20}
          borderWidth={2}
          borderColor={isChecked ? '#EB2355' : '$color3'}
          size="$2"
        />
      </Switch>
    </XStack>
  );
}
export default SettingsScreen;
