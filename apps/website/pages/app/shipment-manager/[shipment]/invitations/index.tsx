import { ShipmentInvitationsListScreen } from '@zix/features/shipments';
import { AppLayout } from '@zix/ui/layouts';
import React from 'react';

export const Screen = () => {
  return (
    <ShipmentInvitationsListScreen />
  )
}

Screen.getLayout = (screen) => (
  <AppLayout>
    {screen}
  </AppLayout>
)

export default Screen;
