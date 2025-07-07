import React from 'react';

import { AppHeader, ScreenLayout } from '@zix/ui/layouts';

export const ManageStoreScreen: React.FC = () => {
  return (
    <ScreenLayout safeAreaBottom>
      <AppHeader showBackButton title={''} />
    </ScreenLayout>
  );
};

export default ManageStoreScreen;
