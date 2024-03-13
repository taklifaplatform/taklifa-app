import { ShipmentTransformer } from '@zix/api';
import { useMultiLang } from '@zix/i18n';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import ShipmentCardLocation from '../shipment-card-location/shipment-card-location';
import {  ZixMapDirectionWidget, ZixWidgetContainer } from '@zix/ui/widgets';

/* eslint-disable-next-line */
export interface ShipmentDirectionProps {
  shipment: ShipmentTransformer;
}

export const ShipmentDirection: React.FC<ShipmentDirectionProps> = ({
  shipment,
}) => {
  const { isRtl } = useMultiLang();
  return (
    <ZixWidgetContainer label={t('job:shipment-path')}>
      <YStack gap="$4" marginTop="$4">
        <XStack gap="$2" alignItems="center">
          <CustomIcon
            name="assistant-navigation"
            size="$1.5"
            color={'$color5'}
            {...(!isRtl && { rotate: '180deg' })}
          />
          <Text fontSize={20} fontWeight={600} color={'$color5'}>
            {t('job:from_location')}
          </Text>
        </XStack>
        <ShipmentCardLocation
          location={shipment.from_location || {}}
          date={shipment.pick_date || ''}
        />
        <XStack gap="$2" alignItems="center">
          <CustomIcon name="location" size="$1.5" color={'$color5'} />
          <Text fontSize={20} fontWeight={600} color={'$color5'}>
            {t('job:to_location')}
          </Text>
        </XStack>
        <ShipmentCardLocation
          location={shipment.to_location || {}}
          date={shipment.pick_date || ''}
        />
        <ZixMapDirectionWidget
          startLocation={shipment.from_location || {}}
          endLocation={shipment.to_location || {}}
        />
        
      </YStack>
    </ZixWidgetContainer>
  );
};

export default ShipmentDirection;
