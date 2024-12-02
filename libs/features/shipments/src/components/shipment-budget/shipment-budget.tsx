import { ShipmentTransformer } from '@zix/api';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';
import { Text, XStack, YStack } from 'tamagui';

export type ShipmentBudgetProps = {
  shipment: ShipmentTransformer;
}

export const ShipmentBudget: React.FC<ShipmentBudgetProps> = ({
  shipment,
  ...props
}) => {

  const renderCardBudget = (title: string, value: number, currency: string) => (
    <YStack
      gap="$2"
      width={'30%'}
      height={100}
      backgroundColor='$color3'
      paddingVertical="$2"
      borderRadius="$4"
      alignItems="center"
      justifyContent='space-around'
    >
      <Text>
        {title}
      </Text>
      <Text fontSize='$8' fontWeight='bold'>
        {value}
      </Text>
      <Text >
        {currency}
      </Text>
    </YStack>
  );


  return (
    <ZixWidgetContainer label={t('common:budget')}>
      <XStack gap="$4" paddingVertical="$4">
        {renderCardBudget(
          t('shipment:lower'),
          shipment.min_budget?.value || 0,
          shipment.max_budget?.currency?.code || '',
        )}
        {renderCardBudget(
          t('shipment:medium'),
          ((shipment?.max_budget?.value || 0) +
            (shipment?.min_budget?.value || 0)) /
          2,
          shipment.max_budget?.currency?.code || '',
        )}
        {renderCardBudget(
          t('shipment:higher'),
          shipment.max_budget?.value || 0,
          shipment.max_budget?.currency?.code || '',
        )}
      </XStack>
    </ZixWidgetContainer>
  );
};

export default ShipmentBudget;
