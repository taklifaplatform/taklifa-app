import { EditAccountScreen } from '@zix/features/account';
import React from 'react';
import { NextPageWithLayout } from '../../../_app'
import { AppLayout } from '@zix/ui/layouts'

export const Screen: NextPageWithLayout = () => {
  return (
     <EditAccountScreen />
  );
}

Screen.getLayout = (Screen) => (
  <AppLayout>
    {Screen}
  </AppLayout>
)

export default Screen
