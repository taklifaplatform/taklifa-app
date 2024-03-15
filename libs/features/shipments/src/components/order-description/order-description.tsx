import { ShipmentTransformer } from '@zix/api';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import { YStack, Text } from 'tamagui';

/* eslint-disable-next-line */
export interface OrderDescriptionProps {
  items?: ShipmentTransformer[];
}

export const OrderDescription: React.FC<OrderDescriptionProps> = ({
  items,
}) => {
  const description = useMemo(
    () => items?.map((item) => item.notes).join(', '),
    [items],
  );
  return (
    <ZixWidgetContainer label={t('shipment:service-description')}>
      <Text
        fontSize={15}
        fontWeight={'400'}
        color={'$gray9'}
        $sm={{
          fontSize: 13,
          fontWeight: '400',
        }}
      >
        {description}
      </Text>
    </ZixWidgetContainer>
  );
};

export default OrderDescription;
