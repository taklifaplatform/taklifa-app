import {
  Bell,
  MessageCircle,
  ScanBarcode,
  Search
} from '@tamagui/lucide-icons';
import { Button, H4, Input, Theme, XStack, YStack } from '@zix/app/ui/core';
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
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  showSearchBar,
  showBackButton,
  headerRight,
  headerTitle,
  title
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
        size="$3"
        padding="0"
        icon={<UserAvatar profile={profile} size="$4" />}
        variant="outlined"
        pressStyle={{ borderWidth: 0 }}
        onPress={onAvatarPress}
      />
    );

  const renderBackButton = () =>
    showBackButton && (
      <Button
        size="$4"
        padding="0"
        variant="outlined"
        pressStyle={{ borderWidth: 0 }}
        icon={<CustomIcon name="arrow_left" size="$2" />}
        onPress={() => router.back()}
      />
    );

  const renderNotificationsButton = () =>
    !showBackButton && (
      <XStack>
        <Button
          size="$4"
          padding="0"
          backgroundColor="$color5"
          icon={<MessageCircle size="$2" />}
          onPress={() => router.push('/chat')}
        />
        <Button
          size="$4"
          padding="0"
          backgroundColor="$color5"
          icon={<Bell size="$2" />}
          onPress={() => router.push('/notifications')}
        />
      </XStack>
    );

  return (
    <Theme name="light">
      <YStack backgroundColor="$color5" paddingBottom="$2">
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
                <H4>{title ?? t('common:app_name')}</H4>
              )}
            </XStack>
            <XStack flex={0.25} justifyContent="flex-end">
              {headerRight ? headerRight() : renderNotificationsButton()}
            </XStack>
          </XStack>

          {renderSearchBar()}
        </SafeAreaView>
      </YStack>
    </Theme>
  );
};

export default AppHeader;
