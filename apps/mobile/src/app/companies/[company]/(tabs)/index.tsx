import {
  // HomeScreen,
  useCurrentActiveOrg
} from '@zix/app/features/companies-dashboard';
import { HomeScreen } from '@zix/app/features/customer-dashboard';
import { AppHeader } from '@zix/app/ui/common';
import React from 'react';

export default function Screen() {
  const { org } = useCurrentActiveOrg();
  return (
    <>
      <AppHeader title={org?.name || '...'} />
      <HomeScreen />
    </>
  );
}
