
import React from 'react';
import { Text, YStack } from 'tamagui';


/* eslint-disable-next-line */
export interface ShipmentCanceledDetailProps {
}


export const ShipmentCanceledDetail: React.FC<ShipmentCanceledDetailProps> = () => {
  return (
    <YStack padding='$4' backgroundColor={'$red3'} borderColor={'$red9'} borderRadius={'$4'}>
      <Text color={'$red9'} fontSize={20} fontWeight={600}>ShipmentCanceledDetail</Text>
      <Text>ShipmentCanceledDetail</Text>
    </YStack>
  );
}


export default ShipmentCanceledDetail;
