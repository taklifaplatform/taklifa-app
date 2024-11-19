import { useMultiLang } from '@zix/i18n';
import { COMPANY_ROLES, useAuth } from '@zix/services/auth';
import { Settings, UserAvatar, ZixAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AccountSwitcher } from '@zix/ui/layouts';
import { usePathname } from '@zix/utils';
import { t } from 'i18next';
import React, { useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, Theme, View } from 'tamagui';
export default function CustomDrawerContent() {

  const { user, activeRole, isLoggedIn, getUrlPrefix, logout } = useAuth();
  const { activeLang } = useMultiLang();
  const router = useRouter();
  const pathname = usePathname();
  const brandColors = {
    twitter: '#1DA1F2',
  };

  const onProfilePress = useCallback(() => {
    if (COMPANY_ROLES.includes(activeRole)) {
      router.push(`${getUrlPrefix}/companies/${user.active_company?.id}`);
    } else {
      router.push(`${getUrlPrefix}/users/${user.id}`);
    }
  }, [isLoggedIn, user]);

  const onAvatarPress = useCallback(() => {
    if (isLoggedIn) {
      router.push(`${getUrlPrefix}/users/${user?.id}`);
    } else {
      router.push('/auth/login');
    }
  }, [isLoggedIn, router, user, getUrlPrefix]);


  const renderCompanyAvatar = () => (
    <Button
      unstyled
      icon={<ZixAvatar media={user.active_company?.logo} size="$3" />}
      onPress={() => {
        router.push(`${getUrlPrefix}/companies/${user.active_company?.id}`);
      }}
    />
  );

  const renderUserAvatar = () => (
    <Button
      unstyled
      icon={<UserAvatar user={user} size="$3" />}
      onPress={onAvatarPress}
    />
  );

  // Footer
  const renderFooter = () => isLoggedIn ? (
    <View
      justifyContent='flex-end'
      flex={1}
      padding={'$10'}
    >
      <View
        flexDirection='row'
        alignItems='center'
        width={'100%'}
        justifyContent='center'
        gap='$4'
      >
        {COMPANY_ROLES.includes(activeRole) ? renderCompanyAvatar() : renderUserAvatar()}
        <AccountSwitcher />
      </View>
    </View>
  ) : (
    <View
      justifyContent='flex-end'
      flex={1}
      padding={'$6'}
    >
      <Button
        theme='accent'
        onPress={() => router.push('/auth/login')}
        color={'$colo5'}
      >
        LOGIN
      </Button>
    </View>
  );

  return (
    <View
      backgroundColor={'$white'}
      theme={'accent'}
      flex={1}
      width={activeLang === 'ar' ? '132%' : '100%'}
    >
      <View
        padding={'$6'}
        flexDirection='row'
        justifyContent='center'
      >
        <CustomIcon name={`web-logo-${activeLang}`} size={'$15'} color={'black'} />
      </View>
      <View

      >
        <Settings.Group>
          {isLoggedIn && <Settings.Item
            backgroundColor={'transparent'}
            icon={(props: IconProps) => (
              <Theme name='accent'>
                <CustomIcon {...props} name="account" color="$color9" />
              </Theme>
            )}
            isActive={pathname === `${getUrlPrefix}/account/settings/general`}
            onPress={() => onProfilePress()}
            accentColor="$purple9"
          >
            {t('account:settings.profile')}
          </Settings.Item>}
          {isLoggedIn && <Settings.Item
            backgroundColor={'transparent'}
            icon={(props: IconProps) => (
              <Theme name='accent'>
                <CustomIcon {...props} name="settings" color="$color9" />
              </Theme>
            )}
            isActive={pathname === `${getUrlPrefix}/account/settings/general`}
            onPress={() => {
              router.push(`${getUrlPrefix}/account/settings/general`);
            }}
            accentColor="$purple9"
          >
            {t('account:general.title')}
          </Settings.Item>}
          <Settings.Item
            backgroundColor={'transparent'}
            icon={(props: IconProps) => (
              <Theme name='accent'>
                <CustomIcon name="secure" color="$color9" {...props} />
              </Theme>
            )}
            isActive={pathname === '/privacy-policy'}
            onPress={() => {
              router.push('/privacy-policy');
            }}
            accentColor="$purple9"
          >
            {t('account:privacy_policy.title')}
          </Settings.Item>
          <Settings.Item
            backgroundColor={'transparent'}
            icon={(props: IconProps) => (
              <Theme name='accent'>
                <CustomIcon name="book" color="$color9" {...props} />
              </Theme>
            )}
            isActive={pathname === '/terms-of-service'}
            onPress={() => {
              router.push('/terms-of-service');
            }}
            accentColor="$purple9"
          >
            {t('account:terms_of_service.title')}
          </Settings.Item>
          <Settings.Item
            backgroundColor={'transparent'}
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
          {isLoggedIn && <Settings.Item
            backgroundColor={'transparent'}
            icon={(props: IconProps) => (
              <CustomIcon name="logout" color="$color9" {...props} />
            )}
            accentColor="$color9"
            onPress={async () => {
              Alert.alert(
                'Sign Out',
                `Are you sure you want to Sign Out?`,
                [
                  {
                    text: 'Sign Out',
                    onPress: () => logout(),
                    style: 'cancel',
                  },
                  {
                    text: 'Cancel',
                    style: 'destructive',
                  },
                ]
              )
            }}

          >
            {t('account:logout')}
          </Settings.Item>}
        </Settings.Group>
      </View>
      {renderFooter()}
    </View>
  );
}
