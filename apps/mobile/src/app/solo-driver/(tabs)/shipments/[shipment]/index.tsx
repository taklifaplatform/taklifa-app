import { AppHeader } from '@zix/ui/common';
import { ShipmentDetailsScreen } from '@zix/features/solo-driver-dashboard';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Shipment Detail" />
      <ShipmentDetailsScreen />
      
      
    </>
  );
}