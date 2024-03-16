import { ShipmentsListScreen } from '@zix/features/shipments';
import React from 'react';

export default function Screen() {
  return (
    <ShipmentsListScreen urlPrefix='company/shipments' />

    // <>
    //   <AppHeader showBackButton title="Shipments" />
    //   <ShipmentsListingScreen urlPrefix='company/shipments' />
    // </>
  );
}
