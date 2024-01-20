import {
  HomeScreen,
  useCurrentActiveOrg
} from '@zix/app/features/companies-dashboard';
import { AppHeader } from '@zix/app/ui/common';
import React from 'react';

export default function Screen() {
  const { data } = useCurrentActiveOrg();
  return (
    <>
      <AppHeader title={data?.org?.name || '...'} />
      <HomeScreen />
    </>
  );
}
