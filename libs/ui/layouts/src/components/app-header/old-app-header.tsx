import { Search } from '@tamagui/lucide-icons';
import { useAuth } from '@zix/services/auth';
import { UserAvatar } from '@zix/ui/common';
import { ZixInput, ZixInputProps } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import Head from 'next/head';
import { useCallback } from 'react';
import { useRouter } from 'solito/router';
import { Button, ColorTokens, H4, View, XStack, YStack, isWeb } from 'tamagui';

export type AppHeaderProps = {
  searchProps?: ZixInputProps
  showSearchBar?: boolean;
  showBackButton?: boolean;
  headerTitle?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  title?: string;
  headerBackgroundColor?: ColorTokens | 'transparent';
  hideOnWeb?: boolean;
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  searchProps = {},
  showSearchBar,
  showBackButton,
  headerRight,
  headerTitle,
  title,
  hideOnWeb
}) => {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  const onAvatarPress = useCallback(() => {
    if (isLoggedIn) {
      router.push(`/app/users/${user?.id}`);
    } else {
      router.push('/auth/login');
    }
  }, [isLoggedIn, router, user?.id]);

  const renderSearchBar = () => showSearchBar && (
    <View flex={1} paddingHorizontal="$4" paddingVertical='$2'>
      <ZixInput
        height="$4"
        leftIcon={() => <Search size="$1.5" />}
        placeholder={'Search here'}
        {...searchProps}
      />
    </View>
  )

  const renderUserAvatar = () => (
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

  if (hideOnWeb && isWeb) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{title ?? ''} - {t('common:app_name')}</title>
      </Head>
      <YStack backgroundColor='$color2' paddingBottom="$2" position='sticky' top={0} zIndex={100} >
        <XStack
          minHeight='$6'
          padding="$4"
          paddingVertical="$2"
          alignItems="center"
          justifyContent="space-between"
        >
          <XStack flex={0.25} justifyContent="flex-start">
            {renderBackButton()}
            {headerTitle ? (
              headerTitle()
            ) : (
              <H4 fontSize={15} numberOfLines={1}>
                {title ?? t('common:app_name')}
              </H4>
            )}
          </XStack>
          {renderSearchBar()}
          <XStack flex={0.25} justifyContent="flex-end">
            {headerRight ? headerRight() : renderUserAvatar()}
          </XStack>
        </XStack>
      </YStack>
    </>

  );
};

export default AppHeader;
