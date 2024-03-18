import {
  CalendarDays,
  Image,
  Inbox,
  Package,
  PackageOpen,
  Route,
  Weight,
} from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import {
  ZixMediasListWidget,
  ZixVariantOptionsWidget,
  ZixWidgetContainer,
} from '@zix/ui/widgets';
import { t } from 'i18next';
import moment from 'moment';
import React, { useMemo } from 'react';
import { Text, ThemeableStackProps, XStack, YStack } from 'tamagui';
import { SectionWrapper } from '../../screens/shipment-detail-screen/shipment-detail-screen';

export type ShipmentDetailsProps = ThemeableStackProps & {
  shipment: ShipmentTransformer;
};

export const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({
  shipment,
  ...props
}) => {
  const weight = useMemo(
    () => shipment?.items?.map((item) => item.cap_weight + ' ' + item.cap_unit),
    [shipment?.items],
  );

  const size = useMemo(
    () =>
      shipment?.items?.map(
        (item) => `${item.dim_width}x${item.dim_height}x${item.dim_length}cm `,
      ),
    [shipment?.items],
  );

  /* Delivery Time */
  const deliveryTime = useMemo(() => {
    return moment.duration(
      moment(shipment?.deliver_date).diff(moment(shipment?.pick_date)),
    );
  }, [shipment?.pick_date, shipment?.deliver_date]);

  /* Distance */
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
    <SectionWrapper>
      <ZixWidgetContainer label={t('shipment:shipment-details')}>
        <YStack gap="$6" marginTop="$4" {...props}>
          <ZixVariantOptionsWidget
            icon={<Inbox size="$1" color={'$color5'} />}
            label={t('shipment:shipment')}
            optionVariant="details"
            variant="details"
            options={[
              {
                icons: <Package size="$1" color={'$gray9'} />,
                name: t('job:number-of-packages'),
                value: `${shipment?.items?.length}`,
              },
              {
                icons: <PackageOpen size="$1" color={'$gray9'} />,
                name: t('job:shipment-type'),
                value: `${shipment?.items_type}`,
              },
              {
                icons: (
                  <CustomIcon name="aspect_ratio" size="$1" color="$gray3" />
                ),
                name: t('job:package-size'),
                value: `${size}`,
              },
              {
                icons: <Weight size="$1" color={'$gray9'} />,
                name: t('job:package-weight'),
                value: `${weight}`,
              },
            ]}
          />
          <ZixVariantOptionsWidget
            icon={<CustomIcon name="time" size="$1" color="$color5" />}
            label={t('shipment:time-and-distance')}
            optionVariant="details"
            variant="details"
            options={[
              {
                icons: <Inbox size="$1" color={'$gray9'} />,
                name: t('job:deliver_duration'),
                value: `${deliveryTime.humanize()}`,
              },
              {
                icons: <Route size="$1" color={'$gray9'} rotate="90deg" />,
                name: t('job:estimated-distance'),
                value: `${distance.toFixed(2)} km`,
              },
              {
                icons: <CustomIcon name="chronic" size="$1" color={'$gray9'} />,
                name: t('job:estimated-time'),
                value: `${deliveryTime.asHours()} hours`,
              },
              {
                icons: <CustomIcon name="time" size="$1" color={'$gray9'} />,
                name: t('job:deliver_time'),
                value: `${shipment?.pick_time}`,
              },
              {
                icons: <CalendarDays size="$1" color={'$gray9'} />,
                name: t('job:deliver-date'),
                value: `${shipment?.pick_date}`,
              },
              {
                icons: <CustomIcon name="time" size="$1" color={'$gray9'} />,
                name: t('job:delivery-time'),
                value: `${shipment?.deliver_time}`,
              },
              {
                icons: <CalendarDays size="$1" color={'$gray9'} />,
                name: t('job:delivery-date'),
                value: `${shipment?.deliver_date}`,
              },
            ]}
          />
          <YStack gap="$6" marginTop="$4">
            <XStack gap="$3" alignItems="center">
              <Image size="$1.5" color={'$color5'} />
              <Text fontSize={18} fontWeight={600} color={'$color5'}>
                {t('shipment:shipment-image')}
              </Text>
            </XStack>
            {shipment?.items?.map((item) => (
              <ZixMediasListWidget medias={item.medias} />
            ))}
          </YStack>
        </YStack>
      </ZixWidgetContainer>
    </SectionWrapper>
  );
};

export default ShipmentDetails;
