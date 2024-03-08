import { Eye, Inbox, Settings2, X } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { UserAvatar, ZixLinkButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import moment from 'moment';
import React, { useMemo } from 'react';

import { Separator, Stack, Text, XStack, YStack } from 'tamagui';
import JobItemDetails from './JobItemDetails';

export type JobCardProps = {
  job: ShipmentTransformer;
  urlPrefix?: string;
};

export const JobCard: React.FC<JobCardProps> = ({ job, urlPrefix }) => {
  const description = useMemo(
    () => job.items?.map((item) => item.notes).join(', '),
    [job.items]
  );

  const deliveryTime = useMemo(() => {
    return moment.duration(
      moment(job.deliver_date).diff(moment(job.pick_date))
    );
  }, [job.pick_date, job.deliver_date]);

  const renderDetailShipment = () => (
    <YStack gap="$4">
      <XStack justifyContent="space-between">
        <JobItemDetails
          icon={<Inbox size="$1" color={'$gray9'} $sm={{ display: 'none' }} />}
          title="job:number-of-box"
          item={job.items?.length}
        />
        <JobItemDetails
          icon={
            <CustomIcon
              name="time-pace"
              size="$1"
              color={'$gray9'}
              $sm={{ display: 'none' }}
            />
          }
          title="job:deliver_time"
          item={deliveryTime.humanize()}
        />

        <JobItemDetails
          icon={
            <Settings2 size="$1" color={'$gray9'} $sm={{ display: 'none' }} />
          }
          title="job:Suggestions"
          item="TODO"
        />
        <JobItemDetails
          icon={
            <CustomIcon
              name="budget"
              size="$1"
              color={'$gray9'}
              $sm={{ display: 'none' }}
            />
          }
          title="job:budget"
          item={`${job.min_budget?.value} - ${job.max_budget?.value} ${job.min_budget?.currency?.code}`}
        />
      </XStack>

      <JobItemDetails
        icon={
          <CustomIcon name="assistant-navigation" size="$1" color={'$gray9'} />
        }
        title="job:from_location"
        item={job?.from_location?.address}
      />
      <JobItemDetails
        icon={<CustomIcon name="location" size="$1" color={'$gray9'} />}
        title="job:to_location"
        item={job.to_location?.address}
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
      marginBottom={'$4'}
      $sm={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '$6',
        padding: '$4',
      }}
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
            {t('job:job-demand')} {job.items_type}
          </Text>
          <Stack
            flexDirection="row"
            gap="$8"
            marginBottom="$3"
            $sm={{ flexDirection: 'column', gap: '$2' }}
          >
            <XStack gap="$2" alignItems="center">
              {/* TODO change to UserAvatar */}

              <UserAvatar size={'$1'} user={job.user} />
              <Text
                fontSize={12}
                fontWeight={'600'}
                color={'$gray9'}
                $sm={{
                  fontSize: 12,
                  fontWeight: '600',
                }}
              >
                {job.user?.name}
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
                {t('job:job-published')} {moment(job.created_at).fromNow()}
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
        width={'30%'}
        justifyContent="flex-end"
        gap="$2"
        $sm={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ZixLinkButton
          href={`/${urlPrefix}/${job.id}`}
          icon={<Eye />}
          themeInverse
        >
          {t('job:see-more')}
        </ZixLinkButton>
        <ZixLinkButton
          href={`/jobs/${job.id}`}
          icon={<X size="$1" />}
          backgroundColor={'red'}
          color={'$color1'}
          $gtSm={{ display: 'none' }}
        >
          Remove
        </ZixLinkButton>
      </XStack>
    </Stack>
  );
};

export default JobCard;
