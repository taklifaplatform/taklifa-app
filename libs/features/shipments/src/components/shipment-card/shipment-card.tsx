import { Eye, Inbox, Settings2, X } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { UserAvatar, ZixLinkButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import moment from 'moment';
import React, { useMemo } from 'react';

import { useMultiLang } from '@zix/i18n';
import { ZixVariantOptionsWidget } from '@zix/ui/widgets';
import {
  Separator,
  Stack,
  Text,
  ThemeableStackProps,
  XStack,
  YStack,
} from 'tamagui';

export type ShipmentCardProps = ThemeableStackProps & {
  shipment: ShipmentTransformer; // TODO: change to shipment, and add
  urlPrefix?: string;
  variants: 'shipment' | 'job'
};

export const ShipmentCard: React.FC<ShipmentCardProps> = ({
  shipment,
  urlPrefix,
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

  const renderDetailShipment = () => (
    <YStack gap="$4">
      <ZixVariantOptionsWidget
        variant="card"
        optionVariant="card"
        options={[
          {
            icons: (
              <Inbox size="$1" color={'$gray9'} $sm={{ display: 'none' }} />
            ),
            name: t('job:number-of-packages'),
            value: `${shipment.items?.length}`,
          },
          {
            icons: (
              <CustomIcon
                name="time-pace"
                size="$1"
                color={'$gray9'}
                $sm={{ display: 'none' }}
              />
            ),
            name: t('job:deliver_time'),
            value: `${deliveryTime.humanize()}`,
          },
          {
            icons: (
              <Settings2 size="$1" color={'$gray9'} $sm={{ display: 'none' }} />
            ),
            name: t('job:Suggestions'),
            value: 'TODO',
          },
          {
            icons: (
              <CustomIcon
                name="budget"
                size="$1"
                color={'$gray9'}
                $sm={{ display: 'none' }}
              />
            ),
            name: t('shipment:budget'),
            value: `${shipment.min_budget?.value} - ${shipment.max_budget?.value} ${shipment.min_budget?.currency?.code}`,
          },
        ]}
      />
      <ZixVariantOptionsWidget
        variant="location"
        optionVariant="location"
        options={[
          {
            icons: (
              <CustomIcon
                name="assistant-navigation"
                size="$1"
                color={'$gray9'}
                {...(!isRtl && { rotate: '180deg' })}
              />
            ),
            name: t('shipment:from_location'),
            value: `${shipment?.from_location?.address}`,
          },
          {
            icons: <CustomIcon name="location" size="$1" color={'$gray9'} />,
            name: t('shipment:to_location'),
            value: `${shipment.to_location?.address}`,
          },
        ]}
      />
    </YStack>
  );

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      paddingHorizontal="$6"
      paddingVertical="$4"
      backgroundColor={'$color1'}
      borderRadius={'$4'}
      $sm={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '$6',
        padding: '$4',
      }}

      {...props}
    >
      <YStack
        backgroundColor={'$color1'}
        borderRadius={'$4'}
        gap="$4"
        width={'70%'}
        $sm={{ width: '100%' }}
      >
        <YStack gap="$3" justifyContent="flex-start" alignItems="flex-start">
          <Text
            fontSize={25}
            fontWeight={'400'}
            color={'$color5'}
            $sm={{
              fontSize: 18,
              fontWeight: '400',
              color: '$color',
            }}
          >
            {t('job:job-demand')} {`${t('shipment:type:'+shipment?.items_type)}`}
          </Text>
          <Stack
            flexDirection="row"
            gap="$8"
            marginBottom="$3"
            $sm={{ flexDirection: 'column', gap: '$2' }}
          >
            <XStack gap="$2" alignItems="center">
              {/* TODO change to UserAvatar */}

              <UserAvatar size={'$1'} user={shipment.user} />
              <Text
                fontSize={12}
                fontWeight={'600'}
                color={'$gray9'}
                $sm={{
                  fontSize: 12,
                  fontWeight: '600',
                }}
              >
                {shipment.user?.name}
              </Text>
            </XStack>
            <XStack gap="$2" alignItems="center">
              <CustomIcon
                name="chronic"
                size="$1"
                $sm={{
                  display: 'none',
                }}
              />
              <Text
                fontSize={12}
                fontWeight={'600'}
                color={'$gray9'}
                $sm={{
                  fontSize: 9,
                  fontWeight: '600',
                }}
              >
                {t('job:job-published')} {moment(shipment.created_at).fromNow()}
              </Text>
            </XStack>
          </Stack>
          <Text
            fontSize={15}
            fontWeight={'400'}
            color={'$gray9'}
            $sm={{
              fontSize: 13,
              fontWeight: '400',
            }}
          >
            {description}
          </Text>
        </YStack>

        <Separator borderColor={'$gray7'} width={'100%'} />
        {renderDetailShipment()}
      </YStack>
      <Separator
        borderColor={'$gray7'}
        width={'100%'}
        $gtSm={{ display: 'none' }}
      />
      <XStack
      flex={1}
        alignItems="center"
        gap="$2"
        width={'30%'}
        $sm={{
          width: '70%',
          justifyContent: 'center',
          alignItems:"center"
        }}
      >
        <ZixLinkButton
          href={`/${urlPrefix}/${shipment.id}`}
          icon={<Eye />}
          themeInverse
          width={'100%'}
          fontWeight={600}
        >
          {t('shipment:see-more')}
        </ZixLinkButton>
{shipment.status === 'pending' &&
        <ZixLinkButton
          href={`/`}
          icon={<X size="$1" />}
          width={'100%'}
          backgroundColor={'red'}
          color={'$color1'}
          fontWeight={600}
          $gtSm={{ display: 'none' }}
        >
          {t('shipment:reject')}
        </ZixLinkButton>
        }
      </XStack>
    </Stack>
  );
};

export default ShipmentCard;
