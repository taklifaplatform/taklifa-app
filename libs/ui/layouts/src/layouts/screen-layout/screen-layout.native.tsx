import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import React, { Suspense, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UnauthorizedScreen from '../../screens/unauthorized-screen/unauthorized-screen';
import { ScreenLayoutProps } from './screen-layout';

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  authProtected = false,
  safeAreaBottom = false,
  fullSafeArea = false,
}) => {
  const { isLoggedIn } = useAuth();

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
        <UnauthorizedScreen />
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
