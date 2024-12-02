import { ShipmentTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React from 'react';
import { H6, Text, XStack } from 'tamagui';

export type ShipmentCostProps = {
  shipment: ShipmentTransformer;
}

export const ShipmentCost: React.FC<ShipmentCostProps> = ({
  shipment
}) => {
  return (
    <XStack
      theme='accent'
      paddingVertical="$5"
      paddingHorizontal="$2"
      borderRadius='$2'
      justifyContent="space-between"
      alignItems="center"
      backgroundColor='$color2'
    >
      <XStack gap="$3" alignItems="center">
        <CustomIcon name="paper_money" size='$1.5' color={'$color1'} />
        <H6 textTransform='none'>
          {t('common:total-cost-of-shipment')}
        </H6>
      </XStack>
      <XStack gap="$1" alignItems='flex-end' $gtSm={{ gap: '$3' }}>
        <Text fontSize={20} fontWeight='bold'>
          {shipment?.max_budget?.value || 0}
        </Text>
        <Text fontSize={15} fontWeight='bold'>
          {shipment.max_budget?.currency?.code || 0}
        </Text>
      </XStack>
    </XStack>
  );
};

export default ShipmentCost;
