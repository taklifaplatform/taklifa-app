import { Search, ShoppingBag, X } from '@tamagui/lucide-icons';
import { COMPANY_MANAGER_ROLES, useAuth } from '@zix/services/auth';
import { UserAvatar, ZixAvatar } from '@zix/ui/common';
import { ZixInput, ZixInputProps } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useCallback, useState } from 'react';
import { useRouter } from 'solito/router';
import { Button, ColorTokens, H4, Theme, View, XStack, YStack, Text } from 'tamagui';
import { AppHeaderWrapper } from './app-header-wrapper';

export type AppHeaderProps = {
  searchProps?: ZixInputProps;
  showSearchBar?: boolean;
  showBackButton?: boolean;
  showCardHeader?: boolean;
  cardHeaderValue?: string;
  goBack?: () => void;
  headerTitle?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  renderAfterSearchBar?: () => React.ReactNode;
  title?: string;
  headerBackgroundColor?: ColorTokens | 'transparent';
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  searchProps = {},
  showSearchBar,
  showBackButton,
  showCardHeader,
  cardHeaderValue,
  goBack,
  headerRight,
  headerTitle,
  title,
  renderAfterSearchBar,
}) => {
  const { user, activeRole, isLoggedIn, getUrlPrefix, urgencyMode } = useAuth();
  const router = useRouter();
  const onAvatarPress = useCallback(() => {
    if (isLoggedIn) {
      router.push(`${getUrlPrefix}/users/${user?.id}`);
    } else {
      //   router.push('/auth/login');
      router.push(`${getUrlPrefix}/account/settings`);
    }
  }, [isLoggedIn, router, user, getUrlPrefix]);

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const renderSearchBar = () =>
    showSearchBar &&
    isSearchBarOpen && (
      <Theme reset>
        <View paddingHorizontal="$4" paddingVertical="$2" $gtMd={{ flex: 1 }}>
          <ZixInput
            leftIcon={() => <Search size="$1.5" color="$color6" />}
            placeholder={t('common:search')}
            placeholderTextColor="$color11"
            borderWidth={0.5}
            borderColor="$color11"
            fontWeight="600"
            rightIcon={() =>
              searchProps?.value && (
                <X size="$1.5" onPress={() => searchProps?.onChangeText('')} />
              )
            }
            {...searchProps}
          />
        </View>
      </Theme>
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
      icon={
        <View position="relative">
          <UserAvatar user={user} size="$2.5" />
          {user.active_company && (
            <View position="absolute" bottom={-5} right={-5}>
              <ZixAvatar media={user.active_company?.logo} size="$1" />
            </View>
          )}
        </View>
      }
      onPress={onAvatarPress}
    />
  );

  const renderBackButton = () =>
    showBackButton && (
      <View cursor="pointer">
        <Button
          unstyled
          size="$2"
          color={'#FFFFFF'}
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
    !showBackButton
      ? COMPANY_MANAGER_ROLES.includes(activeRole)
        ? renderCompanyAvatar()
        : renderUserAvatar()
      : null;

  const renderToggleSearchBar = () =>
    !showBackButton && (
      <Button
        icon={isSearchBarOpen ? X : Search}
        color={'#FFFFFF'}
        scaleIcon={1.5}
        paddingHorizontal={0}
        onPress={() => setIsSearchBarOpen(!isSearchBarOpen)}
        size="$4"
        backgroundColor="transparent"
      />
    );

  const renderCardHeader = () => showCardHeader && (
    <XStack gap="$2" alignItems="center" >
      <CustomIcon name="riyal" size="$1" color="$color2" />
      <Text fontSize={'$2'} fontWeight={'bold'} color="$color2">{cardHeaderValue}</Text>
      <ShoppingBag size={20} color="$color2" />
    </XStack>
  );

  const renderMobileHeader = () => (
    <YStack
      theme="accent"
      themeShallow
      backgroundColor={'$color1'}
      paddingBottom="$1"
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
              {renderAvatar()}
              {renderBackButton()}
            </XStack>
            <XStack flex={0.5} justifyContent="space-around">
              {headerTitle ? (
                headerTitle()
              ) : (
                <H4
                  fontSize={18}
                  fontWeight="bold"
                  numberOfLines={1}
                  color={'#FFFFFF'}
                >
                  {title ?? <CustomIcon name="logo_light" size="$5" />}
                </H4>
              )}
            </XStack>
            <XStack flex={0.25} justifyContent="flex-end">
              {headerRight ? headerRight() : renderToggleSearchBar()}
              {renderCardHeader()}
            </XStack>
          </XStack>

          {renderSearchBar()}
          {renderAfterSearchBar?.()}
        </YStack>
      </AppHeaderWrapper>
    </YStack>
  );

  return <>{renderMobileHeader()}</>;
};

export default AppHeader;
