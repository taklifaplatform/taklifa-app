import {
  CalendarDays,
  Image,
  Inbox,
  Package,
  PackageOpen,
  Route,
  ScrollText,
  Weight,
} from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { useMultiLang } from '@zix/i18n';
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

export type ShipmentInformationProps = ThemeableStackProps & {
  shipment: ShipmentTransformer;
};

export const ShipmentInformation: React.FC<ShipmentInformationProps> = ({
  shipment,
  ...props
}) => {
  const { activeLang } = useMultiLang()
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
          icon={<Inbox size="$1" color='$color10' />}
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
              value: t(`common:${shipment?.items_type}`),
            },
          ]}
        />
        {
          shipment?.items?.map((item, index) => (
            <ZixVariantOptionsWidget
              key={`index-${item.id}-${index}`}
              icon={<Package size="$1" color={'$color10'} />}
              label={`${t('common:package')} ${index + 1}`}
              optionVariant="location"
              variant="details"
              options={[
                {
                  icons: (
                    <CustomIcon name="aspect_ratio" size="$1" color="$color10" />
                  ),
                  name: t('job:package-size'),
                  value: `${item.dim_width || 0} x ${item.dim_height || 0} x ${item.dim_length || 0} ${t('common:cm')}`,
                },
                {
                  icons: <Weight size="$1" color='$color10' />,
                  name: t('job:package-weight'),
                  value: `${item.cap_weight || 0} ${item.cap_unit || ''}`,
                },
                {
                  icons: <ScrollText size="$1" color='$color10' />,
                  name: t('app:forms.labels.notes'),
                  value: item.notes || ',,,',
                },
              ]}
            />
          ))
        }

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
              value: `${deliveryTime.locale(activeLang).humanize()}`,
            },
            {
              icons: <Route size="$1" color='$color10' rotate="90deg" />,
              name: t('job:estimated-distance'),
              value: distance ? `${distance.toFixed(2)} ${t('app:common.km')}` : `${t('app:common.n/a')}`,
            },
            {
              icons: <CustomIcon name="chronic" size="$1" color='$color10' />,
              name: t('job:estimated-time'),
              value: `${deliveryTime.asHours()} ${t('app:common.hours')}`,
            },
            {
              icons: <CustomIcon name="time" size="$1" color='$color10' />,
              name: t('job:deliver_time'),
              value: `${shipment?.pick_time}`,
            },
            {
              icons: <CalendarDays size="$1" color='$color10' />,
              name: t('job:deliver-date'),
              value: `${moment(shipment?.pick_date).format('DD/MM/YYYY')}`,
            },
            {
              icons: <CustomIcon name="time" size="$1" color='$color10' />,
              name: t('job:delivery-time'),
              value: `${shipment?.deliver_time}`,
            },
            {
              icons: <CalendarDays size="$1" color='$color10' />,
              name: t('job:delivery-date'),
              value: `${moment(shipment?.deliver_date).format('DD/MM/YYYY')}`,
            },
          ]}
        />

        {renderImages()}
      </YStack>
    </ZixWidgetContainer>
  );
};

export default ShipmentInformation;
