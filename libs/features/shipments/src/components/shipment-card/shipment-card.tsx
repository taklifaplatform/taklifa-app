import { Inbox, Settings2 } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import moment from 'moment';
import React, { useMemo } from 'react';

import { useMultiLang } from '@zix/i18n';
import { ZixVariantOptionsWidget } from '@zix/ui/widgets';
import {
  H6,
  Separator,
  Text,
  ThemeableStackProps,
  XStack,
  YStack
} from 'tamagui';
import ShipmentCardActions from '../shipment-card-actions/shipment-card-actions';

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
  const description = useMemo(
    () => shipment.items?.map((item) => item.notes).join(', '),
    [shipment.items],
  );

  const deliveryTime = useMemo(() => {
    return moment.duration(
      moment(shipment.deliver_date).diff(moment(shipment.pick_date)),
    );
  }, [shipment.pick_date, shipment.deliver_date]);




  const renderSender = () => (
    <XStack alignItems='center' gap='$2'>
      <UserAvatar size='$1' user={shipment.user} />
      <Text>
        {shipment.user?.name}
      </Text>
    </XStack>
  )

  const renderTitle = () => (
    <XStack alignItems='center' justifyContent='space-between' gap='$2'>
      <H6 textTransform='none'>
        {t('job:job-demand')}{' '}
        {`${t('shipment:type:' + shipment?.items_type)}`}
      </H6>
      <Text>
        {/* TODO REPLACE WITH SHIPMENT CODE */}
        SWDKSA{shipment.id?.toString().substring(0, 8).toUpperCase()}
      </Text>
    </XStack>
  )

  const renderPublishedDate = () => (
    <XStack alignItems='center' gap='$1'>
      <CustomIcon
        name="chronic"
        size="$1"
      />
      <Text fontSize={10} color='$color9'>
        {t('job:job-published')} {moment(shipment.created_at).fromNow()}
      </Text>
    </XStack>
  )

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
              name="time-pace"
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
              name="budget"
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
      <YStack gap='$2'>
        {renderSender()}
        {renderTitle()}
        {renderPublishedDate()}
      </YStack>

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
