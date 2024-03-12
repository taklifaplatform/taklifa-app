import { ShipmentTransformer } from '@zix/api';
import { useMultiLang } from '@zix/i18n';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import ShipmentCardLocation from '../shipment-card-location/shipment-card-location';

/* eslint-disable-next-line */
export interface ShipmentDirectionProps {
  shipment: ShipmentTransformer;
}

export const ShipmentDirection: React.FC<ShipmentDirectionProps> = ({
  shipment,
}) => {
  const { isRtl } = useMultiLang();
  return (
    <YStack gap="$6" marginTop="$4">
      <XStack gap="$3" alignItems="center">
        <CustomIcon
          name="assistant-navigation"
          size="$1.5"
          color={'$color5'}
          {...(!isRtl && { rotate: '180deg' })}
        />
        <Text fontSize={20} fontWeight={600} color={'$color5'} >{t('job:from_location')}</Text>
      </XStack>
      <ShipmentCardLocation
        address={shipment.from_location?.address || ''}
        date={shipment.pick_date || ''}
        icon={<CustomIcon name="location" size="$1" color={'$gray9'} />}
        phone_number={shipment.user?.phone_number || ''}
        userName={shipment.user?.username || ''}
      />
      <XStack gap="$3" alignItems="center">
        <CustomIcon name="location" size="$1.5" color={'$color5'} />
        <Text fontSize={20} fontWeight={600} color={'$color5'} >{t('job:to_location')}</Text>
      </XStack>
      <ShipmentCardLocation
        address={shipment.to_location?.address || ''}
        date={shipment.pick_date || ''}
        icon={<CustomIcon name="location" size="$1" color={'$gray9'} />}
        phone_number={shipment.recipient_phone || ''}
        userName={shipment.recipient_name || ''}
      />
    </YStack>
  );
};

export default ShipmentDirection;
