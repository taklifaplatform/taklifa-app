import { useQuery } from '@tanstack/react-query';
import { JobService } from '@zix/api';
import { ZixInput, ZixSelectField } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { DataNotFound } from '@zix/ui/common';
import { Stack, Text, XStack, YStack } from 'tamagui';
import { ShipmentCard } from '../../components/shipment-card/shipment-card';

export type JobsListScreenProps = {
  urlPrefix?: string;
};

export const JobsListScreen: React.FC<JobsListScreenProps> = ({
  urlPrefix,
}) => {
  const [status, setStatus] = useState('plus');
  const [search, setSearch] = useState('');
  const { data } = useQuery({
    queryKey: ['JobService.fetchAllShipment'],
    queryFn: () => JobService.listJobs({}),
  });
  return (
    <FlatList
      onEndReachedThreshold={0.5}
      data={data?.data}
      renderItem={({ item, index }) => (
        <ShipmentCard
          key={index}
          urlPrefix={urlPrefix}
          shipment={item}
          variants='job'
          marginBottom="$4"
        />
      )}
      ListHeaderComponent={() => (
        <YStack flex={1} gap="$4" marginHorizontal="$3">
          <ZixInput
            rightIcon={() => <CustomIcon name="search" size="$1" />}
            placeholder={t('job:search')}
            borderColor={'$gray10'}
            hoverStyle={{ borderColor: '$gray10' }}
            width={'100%'}
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
          <XStack
            justifyContent="space-between"
            alignItems="center"
            paddingVertical="$2"
          >
            <XStack gap="$2">
              <Text fontSize={12} fontWeight="600">
                {data?.meta?.total || 0}
              </Text>
              <Text fontSize={12}>{t('job:job-found')}</Text>
            </XStack>
            <XStack
              justifyContent="space-between"
              alignItems="center"
              $sm={{ display: 'none' }}
            >
              <Text fontSize={12}>{t('job:job-filter')}</Text>
              <Stack>
                <ZixSelectField
                  selectTriggerProps={{
                    borderWidth: 0,
                    justifyContent: 'space-between',
                  }}
                  fontSize="$4"
                  fontWeight="600"
                  options={[
                    { id: 'plus', name: 'الأكثر صلة' },
                    { id: 'moin', name: 'الأقل صلة' },
                  ]}
                  onChange={(value) => setStatus(value)}
                  value={status}
                />
              </Stack>
            </XStack>
          </XStack>
        </YStack>
      )}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
      ListEmptyComponent={() => (
        <DataNotFound
          message={t('job:job-not-found')}
          description={t('job:job-not-found-description')}
          imageUrl='/assets/jobNotFound.png'
        />
      )}
    />
  );
};

export default JobsListScreen;
