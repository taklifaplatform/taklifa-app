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
import { getDistance } from '@zix/utils';
import { t } from 'i18next';
import moment from 'moment';
import React, { useMemo } from 'react';
import { Text, ThemeableStackProps, XStack, YStack } from 'tamagui';

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
    if (!shipment?.from_location || !shipment?.to_location) return 0;
    return getDistance(
      shipment.from_location,
      shipment.to_location,
    )
  }, [
    shipment,
  ]);


  const renderImages = () => !!shipment?.items?.filter(i => i.medias?.length).length && (
    <YStack gap="$6" marginTop="$4">
      <XStack theme='accent' gap="$3" alignItems="center">
        <Image size="$1.5" color='$color10' />
        <Text fontSize={18} fontWeight='bold' color='$color10'>
          {t('shipment:shipment-image')}
        </Text>
      </XStack>
      {shipment?.items?.map((item) => (
        <ZixMediasListWidget medias={item.medias} />
      ))}
    </YStack>
  )


  return (
    <ZixWidgetContainer label={t('shipment:shipment-details')}>
      <YStack gap="$6" {...props}>
        <ZixVariantOptionsWidget
          icon={<Inbox size="$1" color={'$color5'} />}
          label={t('shipment:shipment')}
          labelContainerProps={{
            theme: 'accent',
          }}
          optionVariant="details"
          variant="details"
          options={[
            {
              icons: <Package size="$1" color='$color10' />,
              name: t('job:number-of-packages'),
              value: `${shipment?.items?.length}`,
            },
            {
              icons: <PackageOpen size="$1" color='$color10' />,
              name: t('job:shipment-type'),
              value: `${shipment?.items_type}`,
            },
            {
              icons: (
                <CustomIcon name="aspect_ratio" size="$1" color="$color10" />
              ),
              name: t('job:package-size'),
              value: `${size}`,
            },
            {
              icons: <Weight size="$1" color='$color10' />,
              name: t('job:package-weight'),
              value: `${weight}`,
            },
          ]}
        />
        <ZixVariantOptionsWidget
          icon={<CustomIcon name="time" size="$1" color="$color10" />}
          label={t('shipment:time-and-distance')}
          labelContainerProps={{
            theme: 'accent',
          }}
          optionVariant="details"
          variant="details"
          options={[
            {
              icons: <Inbox size="$1" color='$color10' />,
              name: t('job:deliver_duration'),
              value: `${deliveryTime.humanize()}`,
            },
            {
              icons: <Route size="$1" color='$color10' rotate="90deg" />,
              name: t('job:estimated-distance'),
              value: distance ? `${distance.toFixed(2)} km` : 'N/A',
            },
            {
              icons: <CustomIcon name="chronic" size="$1" color='$color10' />,
              name: t('job:estimated-time'),
              value: `${deliveryTime.asHours()} hours`,
            },
            {
              icons: <CustomIcon name="time" size="$1" color='$color10' />,
              name: t('job:deliver_time'),
              value: `${shipment?.pick_time}`,
            },
            {
              icons: <CalendarDays size="$1" color='$color10' />,
              name: t('job:deliver-date'),
              value: `${shipment?.pick_date}`,
            },
            {
              icons: <CustomIcon name="time" size="$1" color='$color10' />,
              name: t('job:delivery-time'),
              value: `${shipment?.deliver_time}`,
            },
            {
              icons: <CalendarDays size="$1" color='$color10' />,
              name: t('job:delivery-date'),
              value: `${shipment?.deliver_date}`,
            },
          ]}
        />

        {renderImages()}
      </YStack>
    </ZixWidgetContainer>
  );
};

export default ShipmentDetails;
