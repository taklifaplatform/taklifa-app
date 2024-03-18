import { Route } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import moment from 'moment';
import React, { useMemo } from 'react';

import { Stack, XStack, Text, ThemeableStackProps } from 'tamagui';

/* eslint-disable-next-line */
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
    const lat1 = shipment?.from_location?.latitude || 0;
    const lon1 = shipment?.from_location?.longitude || 0;
    const lat2 = shipment?.to_location?.latitude || 0;
    const lon2 = shipment?.to_location?.longitude || 0;
    // calculate distance
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    // convert to km
    return d / 1000;
  }, [
    shipment?.from_location?.latitude,
    shipment?.from_location?.longitude,
    shipment?.to_location?.latitude,
    shipment?.to_location?.longitude,
  ]);
  return (
    <XStack width={'100%'} gap="$2" justifyContent="space-between">
      <Stack
        paddingHorizontal="$5"
        paddingVertical="$2"
        borderRadius={'$4'}
        backgroundColor={'$color3'}
        borderWidth="$1"
        borderColor={'$color5'}
        justifyContent="center"
        alignItems="center"
      >
        <Text color={'$color5'}>{t(shipment?.status)}</Text>
      </Stack>
      <Stack
        flexDirection="row"
        gap="$2"
        paddingHorizontal="$5"
        paddingVertical="$2"
        borderRadius={'$4'}
        backgroundColor={'$gray3'}
        borderWidth="$1"
        borderColor={'$gray7'}
        justifyContent="center"
        alignItems="center"
      >
        <Route size={15} color={'$gray9'} rotate="90deg" />
        <Text color={'$gray9'}>{distance.toFixed(2)} {t('km')}</Text>
      </Stack>
      <Stack
        flexDirection="row"
        gap="$2"
        paddingHorizontal="$5"
        paddingVertical="$2"
        borderRadius={'$4'}
        backgroundColor={'$gray3'}
        borderWidth="$1"
        borderColor={'$gray7'}
        justifyContent="center"
        alignItems="center"
      >
        <CustomIcon name="time" size={15} color={'$gray9'} />
        <Text color={'$gray9'}>{deliveryTime.humanize()}</Text>
      </Stack>
    </XStack>
  );
};

export default ShipmentDeliveringDetail;
