
import { ShipmentTransformer } from '@zix/api';
import React from 'react';
import { Text, YStack } from 'tamagui';


export interface ShipmentStatusProps {
  shipment: ShipmentTransformer;
}


export const ShipmentStatus: React.FC<ShipmentStatusProps> = ({ shipment }) => {
  if (shipment.status !== 'cancelled') return null;
  return (
    <YStack padding='$4' backgroundColor={'$red3'} borderColor={'$red9'} borderRadius={'$4'}>
      <Text color={'$red9'} fontSize={20} fontWeight={600}>ShipmentStatus</Text>
      <Text>ShipmentStatus</Text>
    </YStack>
  );
}


export default ShipmentStatus;
