import { ShipmentTransformer } from '@zix/api';
import { useMultiLang } from '@zix/i18n';
import { MediaAvatar, UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React from 'react';

import { YStack, Text, XStack, Separator, Stack } from 'tamagui';

export type JobCardProps = {
  job: ShipmentTransformer;
  urlPrefix?: string;
};

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const {isRtl} = useMultiLang()
  const renderDetailUserMobile = () => (
    <XStack flex={1} justifyContent="space-between" alignItems="center">
      <CustomIcon name="account" size="$1" />
      <XStack gap="$2" alignItems="center">
        <YStack gap="$2" alignItems="flex-end">
          <Text fontSize={12} fontWeight={'600'} color={'$gray9'}>
            {job.user?.name}
          </Text>
          <XStack gap="$1" alignItems="center">
            <Text fontSize={12} fontWeight={'400'} color={'$gray9'}>
              {job.user?.phone_number}
            </Text>
            <CustomIcon name="account" size="$0.75" color={'$gray9'} />
          </XStack>
        </YStack>
        <UserAvatar size={'$3'} user={job.user} />
      </XStack>
    </XStack>
  );
  const renderDetailShipmentMobile = () => (
    <YStack gap="$2" alignItems="flex-end" paddingVertical="$1">
          <XStack gap="$1" alignItems="center">
            <Text color={'$color5'} fontSize={10}>
              Detais Shipment
            </Text>
            <CustomIcon name="account" size="$0.75" color={'$color5'} />
          </XStack>
          <XStack gap="$2" alignItems="center">
            <Separator vertical borderColor={'$gray7'} height={'20px'} />
            <Text fontSize={10} fontWeight={'600'} color={'$gray9'}>
              {t('job:job-published')} 26 mn
            </Text>
            <CustomIcon name="account" size="$0.75" />
            <Separator vertical borderColor={'$gray7'} height={'20px'} />

            <Text fontSize={10} fontWeight={'600'} color={'$gray9'}>
              {job.items_type}
            </Text>
            <CustomIcon name="account" size="$0.75" />
          </XStack>
        </YStack>
  )
  const renderDetailDeliveryMobile = () => (
    <YStack flex={1} width={'100%'} paddingVertical='$4' gap='$6'>
      <XStack gap='$2' justifyContent='flex-end'>
      <Text fontSize={12} fontWeight={'600'} color={'$gray9'}>
          {job?.pick_date } 
        </Text>
        <YStack gap="$2" alignItems="flex-end" width={'50%'}>
        <Text fontSize={12} fontWeight={'600'} color={'$gray9'} >
          {t('job:from_location')}
        </Text>
        <Text fontSize={12} fontWeight={'800'} textAlign='left'>
          Rue Gabes km 6 thyna
        </Text>
        </YStack>
        
        <CustomIcon name="home" size="$1" color={'$gray9'}/>
      </XStack>
      <XStack gap='$2' justifyContent='flex-end'>
      <Text fontSize={12} fontWeight={'600'} color={'$gray9'}>
          {job?.pick_date } 
        </Text>
        <YStack gap="$2" alignItems="flex-end" width={'50%'}>
        <Text fontSize={12} fontWeight={'600'} color={'$gray9'} >
          {t('job:from_location')}
        </Text>
        <Text fontSize={12} fontWeight={'600'} textAlign='left'>
          Rue Gabes km 6 thyna
        </Text>
        </YStack>
        
        <CustomIcon name="location" size="$1" color={'$gray9'}/>
      </XStack>
<Stack

position='absolute'
top={'40px'}
right={isRtl ? '-15px' : 'auto'}
left={isRtl ? 'auto' : '-15px'}
>
<CustomIcon name="vector" size="$5" color={'$gray9'}/>
</Stack>
    </YStack>
  )
  return (
    <>
      <YStack
        $lg={{ display: 'none' }}
        width={'100%'}
        justifyContent="flex-start"
        alignItems="flex-end"
        paddingHorizontal="$6"
        paddingVertical="$4"
        gap="$3"
        backgroundColor={'$color1'}
        borderRadius={'$4'}
        marginBottom={'$6'}
      >
        <YStack
          width={'40%'}
          gap="$3"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Text fontSize={15} fontWeight={'600'}>
            {job.id}
          </Text>
          <Text fontSize={25} fontWeight={'400'} color={'$color5'}>
            {t('job:job-demand')} {job.items_type}
          </Text>
          <XStack gap="$8">
            <XStack gap="$2" alignItems="center">
              <Text fontSize={12} fontWeight={'600'} color={'$gray9'}>
                {t('job:job-published')} 26 mn
              </Text>
              <CustomIcon name="account" size="$1" />
            </XStack>
            <XStack gap="$2" alignItems="center">
              {/* TODO change to UserAvatar */}
              <Text fontSize={12} fontWeight={'600'} color={'$gray9'}>
                {job.user?.name}
              </Text>
              <UserAvatar size={'$1'} user={job.user} />
            </XStack>
          </XStack>
        </YStack>
      </YStack>
      <YStack
        $gtLg={{ display: 'none' }}
        width={'100%'}
        paddingHorizontal="$6"
        paddingVertical="$4"
        gap="$3"
        backgroundColor={'$color1'}
        borderRadius={'$4'}
        marginBottom={'$6'}
      >
        {renderDetailUserMobile()}
        <Separator width="100%" borderColor={'$gray7'} />
        {renderDetailShipmentMobile()}
        <Separator width="100%" borderColor={'$gray7'} />
        {renderDetailDeliveryMobile()}
      </YStack>
    </>
  );
};

export default JobCard;
