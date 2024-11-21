import { PlusSquare, Search } from '@tamagui/lucide-icons';
import { COMPANY_ROLES, useAuth } from '@zix/services/auth';
import { UserAvatar, ZixAvatar } from '@zix/ui/common';
import { ZixInput, ZixInputProps } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useCallback } from 'react';
import { useRouter } from 'solito/router';
import { Button, ColorTokens, H4, View, XStack, YStack } from 'tamagui';
import ZixNotificationHeaderButton from '../zix-notification-header-button/zix-notification-header-button';
import { AppHeaderWrapper } from './app-header-wrapper';
import { useNavigation } from 'expo-router';
import { useDrawer } from './useDrawer';
import { Platform } from 'react-native';

export type AppHeaderProps = {
  searchProps?: ZixInputProps;
  showSearchBar?: boolean;
  showBackButton?: boolean;
  goBack?: () => void;
  headerTitle?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  title?: string;
  headerBackgroundColor?: ColorTokens | 'transparent';
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  searchProps = {},
  showSearchBar,
  showBackButton,
  goBack,
  headerRight,
  headerTitle,
  title,
}) => {
  const { user, activeRole, isLoggedIn, getUrlPrefix } = useAuth();
  const router = useRouter();
  const { toggleDrawer } = useDrawer()

  const onAvatarPress = useCallback(() => {
    if (isLoggedIn) {
      router.push(`${getUrlPrefix}/users/${user?.id}`);
    } else {
      router.push('/auth/login');
    }
  }, [isLoggedIn, router, user, getUrlPrefix]);

  const renderSearchBar = () =>
    showSearchBar && (
      <View paddingHorizontal="$4" paddingVertical="$2" $gtMd={{ flex: 1 }}>
        <ZixInput
          leftIcon={() => <Search size="$1.5" />}
          placeholder={t('common:search')}
          {...searchProps}
        />
      </View>
    );

  const renderCompanyAvatar = () => (
    <Button
      unstyled
      icon={<ZixAvatar media={user.active_company?.logo} size="$2.5" />}
      onPress={() => {
        router.push(`${getUrlPrefix}/companies/${user.active_company?.id}`);
      }}
    />
  );

  const renderUserAvatar = () => (
    <Button
      unstyled
      icon={<UserAvatar user={user} size="$2.5" />}
      onPress={onAvatarPress}
    />
  );

  const renderBackButton = () =>
    showBackButton && (
      <View
        cursor='pointer'
      >
        <Button
          unstyled
          size="$2"
          icon={<CustomIcon name="arrow_left" size="$2" />}
          onPress={() => {
            if (goBack) {
              goBack();
            } else {
              router.back();
            }
          }}
        />
      </View>
    );

  const renderAvatar = () =>
    !showBackButton ? COMPANY_ROLES.includes(activeRole) ? renderCompanyAvatar() : renderUserAvatar() : null;

  const renderNotificationsButton = () =>
    !showBackButton && (
      <XStack>
        <ZixNotificationHeaderButton />
      </XStack>
    );

  const renderDesktopHeader = () => (
    <YStack
      display="none"
      $gtMd={{ display: 'block' }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      position="sticky"
      top={0}
      zIndex={100}
      backgroundColor="$color2"
    >
      <AppHeaderWrapper>
        <XStack
          padding="$4"
          paddingVertical="$2"
          alignItems="center"
          justifyContent="space-between"
        >
          <XStack flex={0.25} alignItems="center" gap="$4">
            {renderBackButton()}

            {headerTitle ? (
              headerTitle()
            ) : (
              <H4 fontSize={15} numberOfLines={1}>
                {title ?? t('common:app_name')}
              </H4>
            )}
          </XStack>
          <XStack flex={0.5}>{renderSearchBar()}</XStack>

          <XStack>
            {headerRight ? (
              headerRight()
            ) : (
              null
              /*
              <Button
                flex={1}
                theme="accent"
                variant="outlined"
                icon={PlusSquare}
              >
                Send New Shipments
              </Button>*/
            )}
          </XStack>
        </XStack>
      </AppHeaderWrapper>
    </YStack>
  );

  const renderMobileHeader = () => (
    <YStack
      theme="accent"
      themeShallow
      backgroundColor="$color9"
      paddingBottom="$2"
      $gtMd={{ display: 'none' }}
    >
      <AppHeaderWrapper>
        <YStack>
          <XStack
            padding="$4"
            paddingVertical="$2"
            alignItems="center"
            justifyContent="space-between"
          >
            <XStack flex={0.25} justifyContent="flex-start">
              {Platform.OS === 'web' ? renderAvatar() :
                !showBackButton && <Button
                  unstyled
                  size="$2"
                  icon={<CustomIcon name="list" size="$2" color={'$color'} />}
                  onPress={() => {
                    toggleDrawer()
                  }}
                />}
              {renderBackButton()}
            </XStack>
            <XStack flex={0.5} justifyContent="space-around">
              {headerTitle ? (
                headerTitle()
              ) : (
                <H4 fontSize={15} numberOfLines={1}>
                  {title ?? t('common:app_name')}
                </H4>
              )}
            </XStack>
            <XStack flex={0.25} justifyContent="flex-end">
              {headerRight ? headerRight() : renderNotificationsButton()}
            </XStack>
          </XStack>

          {renderSearchBar()}
        </YStack>
      </AppHeaderWrapper>
    </YStack>
  );

  return (
    <>
      {renderDesktopHeader()}
      {renderMobileHeader()}
    </>
  );
};

export default AppHeader;
