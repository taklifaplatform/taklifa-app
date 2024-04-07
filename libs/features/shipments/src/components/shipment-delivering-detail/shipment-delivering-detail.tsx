import { Route } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { getDistance } from '@zix/utils';
import { t } from 'i18next';
import moment from 'moment';
import React, { useMemo } from 'react';

import { Button, ThemeableStackProps, XStack } from 'tamagui';

export type ShipmentDeliveringDetailProps = ThemeableStackProps & {
  shipment: ShipmentTransformer;
};

export const ShipmentDeliveringDetail: React.FC<
  ShipmentDeliveringDetailProps
> = ({ shipment, ...props }) => {
  const deliveryTime = useMemo(() => {
    return moment.duration(
      moment(shipment?.deliver_date).diff(moment(shipment?.pick_date)),
    );
  }, [shipment?.pick_date, shipment?.deliver_date]);

  const distance = useMemo(() => {
    if (!shipment?.from_location || !shipment?.to_location) return 0;
    return getDistance(
      shipment.from_location,
      shipment.to_location,
    )
  }, [shipment.from_location, shipment.to_location]);

  if (shipment?.status !== 'delivering') {
    return null;
  }

  return (
    <XStack gap="$2" justifyContent="space-between" {...props}>
      <Button
        flex={1}
        theme='accent'
        color='$color1'
        backgroundColor='$color2'
        variant='outlined'
      >
        {t(shipment?.status as any)}
      </Button>

      <Button
        variant='outlined'
        icon={<Route size={15} color={'$color9'} rotate="90deg" />}
      >
        {distance.toFixed(2)} {t('km')}
      </Button>

      <Button
        flex={1}
        variant='outlined'
        icon={<CustomIcon name="time" size={15} color={'$color9'} />}
      >
        {deliveryTime.humanize()}
      </Button>
    </XStack>
  );
};

export default ShipmentDeliveringDetail;
