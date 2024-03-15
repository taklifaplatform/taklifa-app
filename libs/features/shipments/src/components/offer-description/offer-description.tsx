
import { ShipmentTransformer } from '@zix/api';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';

import { Text, ThemeableStackProps } from 'tamagui';

/* eslint-disable-next-line */
export type OfferDescriptionProps =  ThemeableStackProps &{
  shipment: ShipmentTransformer;
}


export const OfferDescription: React.FC<OfferDescriptionProps> = ({
  shipment,
  ...props }) => {
  return (
    <ZixWidgetContainer label={t('shipment:offer-description')}>
          <Text
            fontSize={15}
            fontWeight={'400'}
            color={'$gray9'}
            $sm={{
              fontSize: 13,
              fontWeight: '400',
            }}
          >
            {shipment?.items?.map((item) => item.content).join(', ')}
          </Text>
        </ZixWidgetContainer>
  );
}


export default OfferDescription;
