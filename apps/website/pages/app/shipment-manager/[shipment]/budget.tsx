import { ManageShipmentBudgetScreen } from '@zix/features/shipments';
import { AppLayout } from '@zix/ui/layouts';
import React from 'react';

export const Screen = () => {
  return (
    <ManageShipmentBudgetScreen />
  )
}

Screen.getLayout = (screen) => (
  <AppLayout>
    {screen}
  </AppLayout>
)

export default Screen

