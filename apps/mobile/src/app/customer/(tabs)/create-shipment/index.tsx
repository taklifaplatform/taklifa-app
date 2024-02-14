import { SummaryShipmentScreen } from '@zix/app/features/customer-dashboard';
import { AppHeader } from '@zix/app/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader 
      showBackButton 
      title="مراجعة البيانات"
      headerBackgroundColor='transparent'
       />
      <SummaryShipmentScreen/>
    </>
  );
}
