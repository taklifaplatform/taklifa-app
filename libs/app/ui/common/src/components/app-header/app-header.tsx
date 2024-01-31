import { Bell, ScanBarcode, Search } from '@tamagui/lucide-icons';
import {
  Button,
  ColorTokens,
  H4,
  Input,
  XStack,
  YStack
} from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { useUser } from '@zix/core/auth';
import { t } from 'i18next';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'solito/router';
import UserAvatar from '../user-avatar/user-avatar';

export type AppHeaderProps = {
  showSearchBar?: boolean;
  showBackButton?: boolean;
  headerTitle?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  title?: string;
  headerBackgroundColor?: ColorTokens | 'transparent';
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  showSearchBar,
  showBackButton,
  headerRight,
  headerTitle,
  title,
  headerBackgroundColor = '$color5'
}) => {
  const { profile, user } = useUser();
  const router = useRouter();

  const onAvatarPress = useCallback(() => {
    console.log('============');
    console.log('onAvatarPress::', user);
    console.log('============');
    if (user) {
      router.push('/account');
    } else {
      router.push('/auth/login');
    }
  }, [user, router]);

  const renderSearchBar = () =>
    showSearchBar && (
      <XStack
        padding="$4"
        paddingVertical="$2"
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack alignItems="center" flex={1}>
          <Button
            size="$3"
            icon={<Search size="$1.5" />}
            color="$color5"
            marginRight="$-4"
            backgroundColor="white"
          />
          <Input
            size="$3"
            placeholder={'Search here'}
            flex={1}
            borderColor="transparent"
            keyboardType="numeric"
          />
          <Button
            size="$3"
            icon={<ScanBarcode size="$1.5" />}
            marginLeft="$-4"
            borderTopLeftRadius="$0"
            borderBottomLeftRadius="$0"
            backgroundColor="white"
          />
        </XStack>
      </XStack>
    );

  const renderUserAvatar = () =>
    !showBackButton && (
      <Button
        unstyled
        icon={<UserAvatar user={profile} size="$2.5" />}
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
        backgroundColor={'#F6F6F6'}
      />
    );

  const renderNotificationsButton = () =>
    !showBackButton && (
      <XStack>
        {/* <Button
          size="$2"
          backgroundColor="$color5"
          icon={<MessageCircle size="$1" />}
          onPress={() => router.push('/messenger')}
        /> */}
        <Button
          unstyled
          size="$2"
          icon={<Bell size="$1" fill="#000" />}
          onPress={() => router.push('/notifications')}
        />
      </XStack>
    );

  return (
    <YStack backgroundColor={headerBackgroundColor} paddingBottom="$2">
      <SafeAreaView edges={['top', 'left', 'right']}>
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
              <H4 fontSize={15}>{title ?? t('common:app_name')}</H4>
            )}
          </XStack>
          <XStack flex={0.25} justifyContent="flex-end">
            {headerRight ? headerRight() : renderNotificationsButton()}
          </XStack>
        </XStack>

        {renderSearchBar()}
      </SafeAreaView>
    </YStack>
  );
};

export default AppHeader;
