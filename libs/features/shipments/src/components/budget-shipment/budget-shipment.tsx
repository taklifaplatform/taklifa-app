import { ShipmentTransformer } from '@zix/api';
import React from 'react';
import { Text, XStack, YStack } from 'tamagui';

/* eslint-disable-next-line */
export interface BudgetShipmentProps {
  shipment: ShipmentTransformer;
}

export const BudgetShipment: React.FC<BudgetShipmentProps> = ({ shipment }) => {
  return (
    <XStack gap="$4">
      <YStack
        gap="$2"
        width={'30%'}
        height={100}
        backgroundColor={'$gray5'}
        padding="$4"
        borderRadius="$4"
        alignItems="center"
      >
        <Text color={'$gray9'} fontWeight={'400'}>
          الأعلى
        </Text>
        <Text fontSize={20} fontWeight={'800'}>
          {shipment.max_budget?.value}
        </Text>
        <Text fontSize={12} fontWeight={'600'}>
          {shipment.max_budget?.currency?.code}
        </Text>
      </YStack>
      <YStack
        gap="$2"
        width={'30%'}
        height={100}
        backgroundColor={'$gray5'}
        padding="$4"
        borderRadius="$4"
        alignItems="center"
      >
        <Text color={'$gray9'} fontWeight={'400'}>
          متوسط
        </Text>
        <Text fontSize={20} fontWeight={'800'}>
          {shipment.max_budget?.value}
        </Text>
        <Text fontSize={12} fontWeight={'600'}>
          {shipment.max_budget?.currency?.code}
        </Text>
      </YStack>
      <YStack
        gap="$2"
        width={'30%'}
        height={100}
        backgroundColor={'$gray5'}
        padding="$4"
        borderRadius="$4"
        alignItems="center"
      >
        <Text color={'$gray9'} fontWeight={'400'}>
          الأقل
        </Text>
        <Text fontSize={20} fontWeight={'800'}>
          {shipment.max_budget?.value}
        </Text>
        <Text fontSize={12} fontWeight={'600'}>
          {shipment.max_budget?.currency?.code}
        </Text>
      </YStack>
    </XStack>
  );
};

export default BudgetShipment;
