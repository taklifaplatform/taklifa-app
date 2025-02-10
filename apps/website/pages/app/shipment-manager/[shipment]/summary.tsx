import { ShipmentSummaryScreen } from '@zix/features/shipments';
import { AppLayout } from '@zix/ui/layouts';
import React from 'react';

export const Screen = () => {
  return (
    <ShipmentSummaryScreen />
  )
}

Screen.getLayout = (Screen) => (
  <AppLayout>
    {Screen}
  </AppLayout>
)
