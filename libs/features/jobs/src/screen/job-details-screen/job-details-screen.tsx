import { Eye, X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { JobService } from '@zix/api';
import { UserAvatar, ZixLinkButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import moment from 'moment';
import { useMemo } from 'react';
import { createParam } from 'solito'
import { Stack, XStack, Text, YStack, Separator } from 'tamagui';

/* eslint-disable-next-line */
export interface JobDetailsScreenProps {
}

const { useParams } = createParam()
export function JobDetailsScreen(props: JobDetailsScreenProps) {
  
  const { params } = useParams()
  const { data } = useQuery({
    queryKey: ['JobService.retrieveJob', { id: params.job }],
    queryFn: () => JobService.retrieveJob({ job: params.job }),
  });
  const job = data?.data;
  const description = useMemo(
    () => job?.items?.map((item) => item.notes).join(', '),
    [job?.items]
  );

  const deliveryTime = useMemo(() => {
    return moment.duration(
      moment(job?.deliver_date).diff(moment(job?.pick_date))
    );
  }, [job?.pick_date, job?.deliver_date]);

  const renderHeaderCard = () => (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      $sm={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '$6',
        padding: '$4',
      }}
      >
        <YStack gap="$3">
          <Text
            fontSize={15}
            fontWeight={'600'}
            $sm={{
              fontSize: 12,
              fontWeight: '600',
            }}
          >
            {job?.id}
          </Text>
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

              <UserAvatar
                size={'$1'}
                user={job?.user}
              />
              <Text
                fontSize={12}
                fontWeight={'600'}
                color={'$gray9'}
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
                color={'$gray9'}
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
        <ZixLinkButton
          href={`/`}
          icon={<Eye />}
          themeInverse
        >
          {t('job:see-more')}
        </ZixLinkButton>
      </Stack>
  )
  return (
    <Stack
      flexDirection="column"
      paddingHorizontal="$6"
      paddingVertical="$4"
      backgroundColor={'$color1'}
      borderRadius={'$4'}
      marginBottom={'$4'}
      gap="$4"
      $sm={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: '$6',
        padding: '$4',
      }}
    >
      {renderHeaderCard()}
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
          href={`/`}
          icon={<Eye />}
          themeInverse
          $gtSm={{ display: 'none' }}
        >
          {t('job:see-more')}
        </ZixLinkButton>
        <ZixLinkButton
          href={`/jobs/${job?.id}`}
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
}


export default JobDetailsScreen;
