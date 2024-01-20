// import { HomeScreen } from '@zix/app/features/solo-driver-dashboard';
import { HomeScreen } from '@zix/app/features/customer-dashboard';
import { AppHeader } from '@zix/app/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader />
      <HomeScreen />
    </>
  );
}
