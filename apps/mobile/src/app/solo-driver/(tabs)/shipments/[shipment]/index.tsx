import { AppHeader } from '@zix/ui/common';
import { ShipmentDetailsScreen } from 'libs/features/solo-driver-dashboard/src/screens/shipments/shipment-details-screen/shipment-details-screen';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Shipment Detail" />
     <ShipmentDetailsScreen />
      
      
    </>
  );
}