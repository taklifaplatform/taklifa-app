import { VehicleProfileScreen } from '@zix/features/vehicles';
import { AppLayout } from '@zix/ui/layouts';
import React from 'react';

export const Screen = () => {
  return (
    <VehicleProfileScreen />
  )
}

Screen.getLayout = (Screen) => (
  <AppLayout>
    {Screen}
  </AppLayout>
)
// export const getServerSideProps = userProtectedGetSSP()

export default Screen
