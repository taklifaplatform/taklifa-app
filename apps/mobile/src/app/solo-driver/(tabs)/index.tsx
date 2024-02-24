// import { HomeScreen } from '@zix/app/features/solo-driver-dashboard';
import { HomeScreen } from '@zix/features/customer-dashboard';
import { AppHeader } from '@zix/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader />
      <HomeScreen />
    </>
  );
}
