import { HomeScreen } from '@zix/features/customer-dashboard';
import { AppHeader } from '@zix/ui/common';
import { useAuth } from '@zix/utils';
import React from 'react';

export default function Screen() {
  const { user } = useAuth()
  return (
    <>
      <AppHeader title={user?.active_company?.name || '...'} />
      <HomeScreen />
    </>
  );
}
