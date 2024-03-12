import {
  CalendarDays,
  Check,
  Inbox,
  Package,
  PackageOpen,
  Route,
  Weight,
  X,
} from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { JobService } from '@zix/api';
import { DebugObject, UserAvatar, ZixLinkButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { ZixVariantOptionsWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import moment from 'moment';
import { useMemo } from 'react';
import { createParam } from 'solito';
import { Stack, Text, XStack, YStack } from 'tamagui';
import { ViewDriverSheet } from '../../../components/ViewDriverSheet';
import ShipmentImages from '../../../components/ShipmentImages';

/* eslint-disable-next-line */
export interface ShipmentDetailsScreenProps {
}

const { useParam } = createParam<{ shipment: string }>();


export const ShipmentDetailsScreen: React.FC<ShipmentDetailsScreenProps> = () => {
  const [shipmentId] = useParam('shipment');
  const { data } = useQuery({
    queryKey: ['JobService.retrieveJob', { id: shipmentId }],
    queryFn: () => JobService.retrieveJob({ job: shipmentId || '' }),
  });
  const shipment = data?.data;

  const description = useMemo(
    () => shipment?.items?.map((item) => item.notes).join(', '),
    [shipment?.items],
  );

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

  const deliveryTime = useMemo(() => {
    return moment.duration(
      moment(shipment?.deliver_date).diff(moment(shipment?.pick_date)),
    );
  }, [shipment?.pick_date, shipment?.deliver_date]);

  const duration = useMemo(() => {
    return moment.duration(
      moment(shipment?.deliver_time).diff(moment(shipment?.pick_time)),
      'minute',
    );
  }, [shipment?.pick_time, shipment?.deliver_time]);


  const renderButton = () => (
    <XStack
    gap="$2"
    $sm={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ZixLinkButton
      href={`/`}
      icon={<Check size="$1" />}
      $gtSm={{ display: 'none' }}
      size={'$3'}
      fontSize={10}
      fontWeight={'600'}
    >
      {t('job:shipment-accept')}
    </ZixLinkButton>
    <ZixLinkButton
      href={`/`}
      icon={<X size="$1" />}
      backgroundColor={'red'}
      color={'$color1'}
      size={'$3'}
      fontSize={10}
      fontWeight={'600'}
      $gtSm={{ display: 'none' }}
    >
      Remove
    </ZixLinkButton>
  </XStack>
  )

  const renderHeaderCard = () => (
    <YStack
      justifyContent="space-between"
      
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
            {t('job:job-demand')} {shipment?.items_type}
          </Text>
          <Stack
            flexDirection="row"
            gap="$8"
            marginBottom="$3"
            $sm={{ flexDirection: 'column', gap: '$2' }}
          >
            <XStack gap="$2" alignItems="center">
              {/* TODO change to UserAvatar */}

              <UserAvatar size={'$1'} user={shipment?.user} />
              <Text
                fontSize={12}
                fontWeight={'600'}
                color={'$gray9'}
                $sm={{
                  fontSize: 12,
                  fontWeight: '600',
                }}
              >
                {shipment?.user?.name}
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
                {t('job:job-published')} {moment(shipment?.created_at).fromNow()}
              </Text>
            </XStack>
          </Stack>
        </YStack>
    </YStack>
  );

  
  return (
    <YStack
      paddingHorizontal="$6"
      paddingVertical="$4"
      borderRadius={'$4'}
      marginBottom={'$4'}
      gap="$4"
    >
      {renderHeaderCard()}
      {/* <ZixWidgetContainer label={t('job:service-description')}>
        <YStack marginTop="$4">
          <Text
            fontSize={15}
            fontWeight={'400'}
            color={'red'}
            $sm={{
              fontSize: 13,
              fontWeight: '400',
            }}
          >
            {description}
          </Text>
        </YStack>
      </ZixWidgetContainer> */}
      {/* <ZixWidgetContainer label={t('job:shipment-details')}>
        <YStack gap="$6" marginTop="$4">
          <ZixVariantOptionsWidget
            icon={<Inbox size="$1" color={'$color5'} />}
            label={t('job:shipment')}
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
            // icon={<Timer size="$1" color={'$color5'} />}
            icon={<CustomIcon name="time" size="$1" color="$color5" />}
            label={t('job:time-and-distance')}
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
                value: `$ToDo km`,
              },
              {
                icons: <CustomIcon name="chronic" size="$1" color={'$gray9'} />,
                name: t('job:estimated-time'),
                value: `${duration.asMinutes()}`,
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
        </YStack>
      </ZixWidgetContainer> */}

     
    </YStack>
  );
}


export default ShipmentDetailsScreen;
