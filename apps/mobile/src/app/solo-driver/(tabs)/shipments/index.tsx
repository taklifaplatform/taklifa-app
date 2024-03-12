import { ShipmentsListingScreen } from '@zix/features/solo-driver-dashboard';
import { AppHeader } from '@zix/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader title="Orders" />
      <ShipmentsListingScreen />
    </>
  );
}
