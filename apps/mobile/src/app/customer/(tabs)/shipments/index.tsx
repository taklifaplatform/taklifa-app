import { CreateShipmentScreen } from '@zix/features/customer-dashboard';
import { AppHeader } from '@zix/ui/common';
import React from 'react';

//
export default function Screen() {
  return (
    <>
      <AppHeader
        title="تفاصيل الشحنة"
        headerBackgroundColor="transparent"
      />
      <CreateShipmentScreen shipment={{}} />
    </>
  );
}
