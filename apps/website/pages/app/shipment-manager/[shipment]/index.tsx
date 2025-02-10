import { ManageShipmentSenderScreen } from '@zix/features/shipments';
import { AppLayout } from '@zix/ui/layouts';
import React from 'react';

export const Screen = () => {
  return (
    <ManageShipmentSenderScreen />
  )
}

Screen.getLayout = (screen) => (
  <AppLayout>
    {screen}
  </AppLayout>
)
