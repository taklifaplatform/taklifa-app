import { Bell, Search } from '@tamagui/lucide-icons';
import { UserAvatar } from '@zix/ui/common';
import { ZixInput, ZixInputProps } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { useAuth } from '@zix/utils';
import { t } from 'i18next';
import { useCallback } from 'react';
import { useRouter } from 'solito/router';
import { Button, ColorTokens, H4, View, XStack, YStack } from 'tamagui';
import Head from 'next/head'

export type AppHeaderProps = {
  searchProps?: ZixInputProps
  showSearchBar?: boolean;
  showBackButton?: boolean;
  headerTitle?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  title?: string;
  headerBackgroundColor?: ColorTokens | 'transparent';
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  searchProps = {},
  showSearchBar,
  showBackButton,
  headerRight,
  headerTitle,
  title,
  headerBackgroundColor = '$color5',
}) => {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  const onAvatarPress = useCallback(() => {
    if (isLoggedIn) {
      router.push('/account');
    } else {
      router.push('/auth/login');
    }
  }, [isLoggedIn, router]);

  const renderSearchBar = () => showSearchBar && (
    <View paddingHorizontal="$4" paddingVertical='$2'>
      <ZixInput
        height="$4"
        leftIcon={() => <Search size="$1.5" />}
        // rightIcon={() => <ScanBarcode size="$1.5" />}
        placeholder={'Search here'}
        {...searchProps}
      />
    </View>
  )

  const renderUserAvatar = () =>
    !showBackButton && (
      <Button
        unstyled
        icon={<UserAvatar user={user} size="$2.5" />}
        onPress={onAvatarPress}
      />
    );

  const renderBackButton = () =>
    showBackButton && (
      <Button
        unstyled
        size="$2"
        icon={<CustomIcon name="arrow_left" size="$2" />}
        onPress={() => router.back()}
      />
    );

  const renderNotificationsButton = () =>
    !showBackButton && (
      <XStack>
        <Button
          unstyled
          size="$2"
          icon={<Bell size="$1" fill="#000" />}
          onPress={() => router.push('/notifications')}
        />
      </XStack>
    );

  return (
    <>
      <Head>
        <title>{title ?? ''} - {t('common:app_name')}</title>
      </Head>
      <YStack backgroundColor={headerBackgroundColor} paddingBottom="$2">
        <XStack
          padding="$4"
          paddingVertical="$2"
          alignItems="center"
          justifyContent="space-between"
        >
          <XStack flex={0.25} justifyContent="flex-start">
            {renderUserAvatar()}
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
    </>

  );
};

export default AppHeader;
