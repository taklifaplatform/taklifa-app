import { useQuery } from '@tanstack/react-query';
import { JobService, ShipmentTransformer, ShipmentsService } from '@zix/api';
import { ZixInput, ZixSelectField } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { Stack, XStack, YStack, Text } from 'tamagui';
import JobCard from '../../components/job-card/job-card';
import { DataNotFound } from '@zix/ui/common';

export type JobsListScreenProps = {
  urlPrefix?: string;
};

export const JobsListScreen: React.FC<JobsListScreenProps> = ({
  urlPrefix = '/jobs',
}) => {
  const [status, setStatus] = useState('plus');
  const [search, setSearch] = useState('');
  const { data } = useQuery({
    queryKey: ['JobService.fetchAllShipment'],
    queryFn: () => JobService.listJobs({}),
  });
  return (
    <YStack flex={1} marginBottom="$6">
      <YStack flex={1} gap="$6" marginHorizontal="$3" marginBottom='$6'>
        <ZixInput
          rightIcon={() => <CustomIcon name="search" size="$1" />}
          placeholder={t('job:search')}
          borderColor={'$gray10'}
          hoverStyle={{ borderColor: '$gray10' }}
          width={'100%'}
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <XStack justifyContent="space-between" alignItems='center'>
          <XStack justifyContent='space-between' alignItems='center'>
            <Stack>
            <ZixSelectField
              selectTriggerProps={{
                borderWidth: 0,
                direction: 'rtl',
                justifyContent: 'space-between',
              }}
              fontSize='$4'
              fontWeight='600'
              options={[
                { id: 'plus', name: 'الأكثر صلة' },
                { id: 'moin', name: 'الأقل صلة' },
              ]}
              onChange={(value) => setStatus(value)}
              value={status}
             
            />
            </Stack>
            <Text fontSize={12}>{t('job:job-filter')}</Text>
          </XStack>
          <XStack gap='$2'>
           
          <Text fontSize={12}>{t('job:job-found')}</Text>
          <Text fontSize={12} fontWeight='600'>12</Text>  
          </XStack>
        </XStack>
      </YStack>

      <FlatList
        onEndReachedThreshold={0.5}
        data={data?.data}
        renderItem={({ item }) => <JobCard job={item} />}
        ListEmptyComponent={() => (
          <DataNotFound
            message={t('job:job-not-found')}
            description={t('job:job-not-found-description')}
          />
        )}
      />
    </YStack>
  );
};

export default JobsListScreen;
