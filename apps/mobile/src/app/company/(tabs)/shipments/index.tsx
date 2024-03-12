import { OrdersListScreen } from '@zix/features/companies-dashboard';
import { AppHeader } from '@zix/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Shipments" />
      <OrdersListScreen urlPrefix='company/shipments' />
    </>
  );
}
