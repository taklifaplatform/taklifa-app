import { FullScreenSpinner } from '@zix/ui/common';
import React, { Suspense } from 'react';

export interface ScreenLayoutProps {
  children: React.ReactNode;
  authProtected?: boolean;
  safeAreaBottom?: boolean;
  fullSafeArea?: boolean;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  authProtected = false,
  safeAreaBottom = false,
}) => {
  return <Suspense fallback={<FullScreenSpinner />}>{children}</Suspense>;
};

export default ScreenLayout;
