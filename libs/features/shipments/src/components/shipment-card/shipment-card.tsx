import { Inbox, Settings2 } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import moment from 'moment';
import React, { useMemo } from 'react';

import { useMultiLang } from '@zix/i18n';
import { ZixVariantOptionsWidget } from '@zix/ui/widgets';
import {
  Separator,
  Text,
  ThemeableStackProps,
  YStack
} from 'tamagui';
import ShipmentCardActions from '../shipment-card-actions/shipment-card-actions';
import ShipmentCardHeader from '../shipment-card-header/shipment-card-header';

export type ShipmentCardProps = ThemeableStackProps & {
  shipment: ShipmentTransformer; // TODO: change to shipment, and add
  urlPrefix: string;
  variant: 'shipments' | 'jobs';
  isDetail?: boolean;
};

export const ShipmentCard: React.FC<ShipmentCardProps> = ({
  shipment,
  variant,
  urlPrefix,
  isDetail,
  ...props
}) => {
  const { isRtl } = useMultiLang();

  const deliveryTime = useMemo(() => {
    return moment.duration(
      moment(shipment.deliver_date).diff(moment(shipment.pick_date)),
    );
  }, [shipment.pick_date, shipment.deliver_date]);


  const renderDescription = () => (
    <YStack gap='$1.5'>
      {
        shipment.items?.map((item) => (
          <Text key={item.id}>
            {item.notes}
          </Text>
        ))
      }
    </YStack>
  )

  const renderDetail = () => (
    <ZixVariantOptionsWidget
      variant="card"
      optionVariant="card"
      options={[
        {
          icons: (
            <Inbox size="$1" color={'$color9'} $sm={{ display: 'none' }} />
          ),
          name: t('job:number-of-packages'),
          value: `${shipment.items?.length}`,
        },
        {
          icons: (
            <CustomIcon
              name="time_pace"
              size="$1"
              color={'$color9'}
              $sm={{ display: 'none' }}
            />
          ),
          name: t('job:deliver_time'),
          value: `${deliveryTime.humanize()}`,
        },
        {
          icons: (
            <Settings2 size="$1" color={'$color9'} $sm={{ display: 'none' }} />
          ),
          name: t('job:Suggestions'),
          value: 'TODO',
        },
        {
          icons: (
            <CustomIcon
              name="paper_money"
              size="$1"
              color={'$color9'}
              $sm={{ display: 'none' }}
            />
          ),
          name: t('shipment:budget'),
          value: `${shipment.min_budget?.value} - ${shipment.max_budget?.value} ${shipment.min_budget?.currency?.code}`,
        },
      ]}
    />
  );

  const renderLocation = () => (
    <ZixVariantOptionsWidget
      variant="location"
      optionVariant="location"
      options={[
        {
          icons: (
            <CustomIcon
              name="assistant-navigation"
              size="$1"
              color={'$color9'}
              {...(!isRtl && { rotate: '180deg' })}
            />
          ),
          name: t('shipment:from_location'),
          value: `${shipment?.from_location?.address}`,
        },
        {
          icons: <CustomIcon name="location" size="$1" color={'$color9'} />,
          name: t('shipment:to_location'),
          value: `${shipment.to_location?.address}`,
        },
      ]}
    />
  )

  return (
    <YStack
      padding="$4"
      backgroundColor='$color1'
      borderRadius='$4'
      gap="$4"
      {...props}
    >
      <ShipmentCardHeader shipment={shipment} />

      {renderDescription()}

      <Separator borderColor='$gray7' />

      {renderDetail()}
      {renderLocation()}

      <Separator borderColor='$gray7' />

      <ShipmentCardActions
        shipment={shipment}
        variant={variant}
        urlPrefix={urlPrefix}
        isDetail={isDetail}
      />
    </YStack>
  );
};

export default ShipmentCard;
