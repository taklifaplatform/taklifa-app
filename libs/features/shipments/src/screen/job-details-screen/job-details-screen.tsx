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
import { UserAvatar, ZixLinkButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { ZixVariantOptionsWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import moment from 'moment';
import { useMemo } from 'react';
import { createParam } from 'solito';
import { Stack, Text, XStack, YStack } from 'tamagui';

const { useParam } = createParam<{ job: string }>();

export function JobDetailsScreen() {
  const [jobId] = useParam('job');

  const { data } = useQuery({
    queryKey: ['JobService.retrieveJob', { id: jobId }],
    queryFn: () => JobService.retrieveJob({ job: jobId || '' }),
  });

  const job = data?.data;

  const description = useMemo(
    () => job?.items?.map((item) => item.notes).join(', '),
    [job?.items],
  );

  const weight = useMemo(
    () => job?.items?.map((item) => item.cap_weight + ' ' + item.cap_unit),
    [job?.items],
  );

  const size = useMemo(
    () =>
      job?.items?.map(
        (item) => `${item.dim_width}x${item.dim_height}x${item.dim_length}${t('common:cm')} `,
      ),
    [job?.items],
  );

  const deliveryTime = useMemo(() => {
    return moment.duration(
      moment(job?.deliver_date).diff(moment(job?.pick_date)),
    );
  }, [job?.pick_date, job?.deliver_date]);

  const duration = useMemo(() => {
    return moment.duration(
      moment(job?.deliver_time).diff(moment(job?.pick_time)),
      'minute',
    );
  }, [job?.pick_time, job?.deliver_time]);

  const distance = useMemo(() => {
    const lat1 = job?.from_location?.latitude || 0;
    const lon1 = job?.from_location?.longitude || 0;
    const lat2 = job?.to_location?.latitude || 0;
    const lon2 = job?.to_location?.longitude || 0;
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
    job?.from_location?.latitude,
    job?.from_location?.longitude,
    job?.to_location?.latitude,
    job?.to_location?.longitude,
  ]);

  const renderHeaderCard = () => (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      $sm={{
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <YStack gap="$3">
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
          {t('job:job-demand')} {job?.items_type}
        </Text>
        <Stack
          flexDirection="row"
          gap="$8"
          marginBottom="$3"
          $sm={{ flexDirection: 'column', gap: '$2' }}
        >
          <XStack gap="$2" alignItems="center">
            {/* TODO change to UserAvatar */}

            <UserAvatar size={'$1'} user={job?.user} />
            <Text
              fontSize={12}
              fontWeight={'600'}
              color={'$color9'}
              $sm={{
                fontSize: 12,
                fontWeight: '600',
              }}
            >
              {job?.user?.name}
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
              color={'$color9'}
              $sm={{
                fontSize: 9,
                fontWeight: '600',
              }}
            >
              {t('job:job-published')} {moment(job?.created_at).fromNow()}
            </Text>
          </XStack>
        </Stack>
      </YStack>
      <ZixLinkButton href={`/`} icon={<Check />} $sm={{ display: 'none' }}>
        {t('job:shipment-accept')}
      </ZixLinkButton>
    </Stack>
  );
  return (
    <Stack
      flexDirection="column"
      paddingHorizontal="$6"
      paddingVertical="$4"
      borderRadius={'$4'}
      marginBottom={'$4'}
      gap="$4"
      $sm={{
        gap: '$6',
        padding: '$4',
      }}
    >
      {renderHeaderCard()}
      <ZixWidgetContainer label={t('shipment:service-description')}>
        <YStack marginTop="$4">
          <Text
            fontSize={15}
            fontWeight={'400'}
            color={'$color9'}
            $sm={{
              fontSize: 13,
              fontWeight: '400',
            }}
          >
            {description}
          </Text>
        </YStack>
      </ZixWidgetContainer>
      <ZixWidgetContainer label={t('shipment:shipment-details')}>
        <YStack gap="$6" marginTop="$4">
          <ZixVariantOptionsWidget
            icon={<Inbox size="$1" color={'$color5'} />}
            label={t('job:shipment')}
            optionVariant="details"
            variant="details"
            options={[
              {
                icons: <Package size="$1" color={'$color9'} />,
                name: t('job:number-of-packages'),
                value: `${job?.items?.length}`,
              },
              {
                icons: <PackageOpen size="$1" color={'$color9'} />,
                name: t('job:shipment-type'),
                value: t(`common:${job?.items_type}`),
              },
              {
                icons: (
                  <CustomIcon name="aspect_ratio" size="$1" color="$gray3" />
                ),
                name: t('job:package-size'),
                value: `${size}`,
              },
              {
                icons: <Weight size="$1" color={'$color9'} />,
                name: t('job:package-weight'),
                value: `${weight}`,
              },
            ]}
          />
          <ZixVariantOptionsWidget
            // icon={<Timer size="$1" color={'$color5'} />}
            icon={<CustomIcon name="time" size="$1" color="$color5" />}
            label={t('shipment:time-and-distance')}
            optionVariant="details"
            variant="details"
            options={[
              {
                icons: <Inbox size="$1" color={'$color9'} />,
                name: t('job:deliver_duration'),
                value: `${deliveryTime.humanize()}`,
              },
              {
                icons: <Route size="$1" color={'$color9'} rotate="90deg" />,
                name: t('job:estimated-distance'),
                value: `${distance} km`,
              },
              {
                icons: <CustomIcon name="chronic" size="$1" color={'$color9'} />,
                name: t('job:estimated-time'),
                value: `${duration.asMinutes()}`,
              },
              {
                icons: <CustomIcon name="time" size="$1" color={'$color9'} />,
                name: t('job:deliver_time'),
                value: `${job?.pick_time}`,
              },
              {
                icons: <CalendarDays size="$1" color={'$color9'} />,
                name: t('job:deliver-date'),
                value: `${job?.pick_date}`,
              },
              {
                icons: <CustomIcon name="time" size="$1" color={'$color9'} />,
                name: t('job:delivery-time'),
                value: `${job?.deliver_time}`,
              },
              {
                icons: <CalendarDays size="$1" color={'$color9'} />,
                name: t('job:delivery-date'),
                value: `${job?.deliver_date}`,
              },
            ]}
          />
        </YStack>
      </ZixWidgetContainer>

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
    </Stack>
  );
}

export default JobDetailsScreen;
