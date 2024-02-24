import { SummaryShipmentScreen } from '@zix/features/customer-dashboard';
import { AppHeader } from '@zix/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader
        showBackButton
        title="مراجعة البيانات"
        headerBackgroundColor="transparent"
      />
      <SummaryShipmentScreen />
    </>
  );
}
