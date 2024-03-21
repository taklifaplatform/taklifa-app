import { AddItemsShipmentScreen } from '@zix/features/customer-dashboard';
import { AppHeader } from '@zix/ui/layouts';
import React from 'react';

//
export default function Screen() {
  return (
    <>
      <AppHeader
        showBackButton
        title="مراجعة البيانات"

      />
      <AddItemsShipmentScreen />
    </>
  );
}
