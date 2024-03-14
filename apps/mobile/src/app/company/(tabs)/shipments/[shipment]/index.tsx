import { ShipmentDetailsScreen } from 'libs/features/companies-dashboard/src/screens/shipments/shipment-details-screen/shipment-details-screen';
import { AppHeader } from '@zix/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Shipment Detail" />
     <ShipmentDetailsScreen />
      
      
    </>
  );
}