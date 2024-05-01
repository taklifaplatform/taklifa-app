import { FullScreenSpinner } from '@zix/ui/common';
import React, { Suspense, useMemo } from 'react';
import { ScreenLayoutProps } from './screen-layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@zix/services/auth';
import { Button, YStack, H2 } from 'tamagui';
import { useRouter } from 'solito/router';

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  authProtected = false,
  safeAreaBottom = false,
  fullSafeArea = false,
}) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const edges = useMemo(() => {
    if (safeAreaBottom) {
      return ['bottom', 'left', 'right'];
    }

    if (fullSafeArea) {
      return ['top', 'bottom', 'left', 'right'];
    }

    return [];
  }, [safeAreaBottom]);

  const showContent = useMemo(
    () => !authProtected || isLoggedIn,
    [authProtected, isLoggedIn],
  );

  if (!showContent) {
    // TODO: UX Design for unauthorized user

    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
        <YStack p='$10' alignItems="center">
          <H2>Unauthorized</H2>
          <Button onPress={() => router.push('/auth/login')}>Login</Button>
        </YStack>
      </SafeAreaView>
    );
  }

  return (
    <Suspense fallback={<FullScreenSpinner />}>
      <SafeAreaView style={{ flex: 1 }} edges={edges}>
        {children}
      </SafeAreaView>
    </Suspense>
  );
};

export default ScreenLayout;
