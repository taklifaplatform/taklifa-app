import { ManageShipmentItemsScreen } from '@zix/features/shipments';
import { AppLayout } from '@zix/ui/layouts';
import React from 'react';


export const Screen = () => {
  return (
    <ManageShipmentItemsScreen />
  )
}

Screen.getLayout = (screen) => (
  <AppLayout>
    {screen}
  </AppLayout>
)
