import { ManageShipmentSenderScreen } from '@zix/features/shipments';
import { AppLayout } from '@zix/ui/layouts';
import React from 'react';
import { YStack } from 'tamagui';

export const Screen = () => {
  return (
   <YStack flex={1}>
     <ManageShipmentSenderScreen />
   </YStack>
  )
}

Screen.getLayout = (screen) => (
  <AppLayout>
    {screen}
  </AppLayout>
)

export default Screen
