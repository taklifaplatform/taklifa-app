import { PriceTransformer, ShipmentTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';
import { Text, XStack } from 'tamagui';

/* eslint-disable-next-line */
export interface TotalCostOfShipmentProps {
  TotalShipment?: string;
  shipment: ShipmentTransformer;
}

export const TotalCostOfShipment: React.FC<TotalCostOfShipmentProps> = ({
  TotalShipment = 'Total cost of shipment',
  shipment

}) => {
  return (
    <XStack
      width={'100%'}
      padding="$5"
      justifyContent="space-between"
      alignItems="flex-start"
      backgroundColor={'$color3'}
      borderRadius={'$2'}
    >
      <XStack gap="$3" alignItems="center">
        <CustomIcon name="budget" size={18} color={'$color5'} />
        <Text fontSize={18} fontWeight={'600'} color={'$color'}>
          {TotalShipment}
        </Text>
      </XStack>
      <XStack gap="$1" alignItems='flex-end'>
        <Text fontSize={20} fontWeight={'600'} color={'$color'}>
          {shipment?.max_budget?.value}
        </Text>
        <Text fontSize={15} fontWeight={'600'} color={'$color'}>
          {shipment.max_budget?.currency?.code}
        </Text>
      </XStack>
    </XStack>
  );
};

export default TotalCostOfShipment;
