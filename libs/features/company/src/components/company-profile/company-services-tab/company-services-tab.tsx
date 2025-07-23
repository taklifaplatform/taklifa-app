import { useQuery } from '@tanstack/react-query';
import { CompanyTransformer, ServiceService } from '@zix/api';
import { ServiceCard } from '@zix/features/services';
import { FilterByOrder, FilterPrice, FullScreenSpinner, SearchProduct } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { H4, View, XStack } from 'tamagui';

export type CompanyServicesTabProps = {
  company: CompanyTransformer
  hideFilters?: boolean;
  setShowSheet?: (show: boolean) => void;
}

export const CompanyServicesTab: React.FC<CompanyServicesTabProps> = ({
  company,
  hideFilters = false,
  setShowSheet,
}) => {
  const [orderBy, setOrderBy] = useState({
    type: 'price',
    direction: 'asc',
  });
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 60000,
  });
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryFn: () => ServiceService.listServices({
      perPage: 10,
    }),
    queryKey: ['ServicesService.listCompanyServices', company.id],
  })

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  return (
    <FlatList
      data={data?.data || []}
      contentContainerStyle={{
        gap: 10,
      }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ServiceCard key={index} service={item} showHeader={false} setShowSheet={setShowSheet} />
      )}
      ListHeaderComponent={() => !hideFilters && (
        <XStack flex={1} gap="$2" alignItems="center" paddingVertical={'$4'}>
          <FilterPrice priceRange={priceRange} setPriceRange={setPriceRange} />
          <FilterByOrder orderBy={orderBy} setOrderBy={setOrderBy} />
          <SearchProduct
            placeholder="ابحث عن منتج"
            value={search}
            onChangeText={setSearch}
          />
        </XStack>
      )}
      ListEmptyComponent={() => (
        <View flex={1} alignItems='center' gap="$2" padding='$4'>
          <CustomIcon name="empty_data" size="$18" color="$color5" />
          <H4 color="#8590A2">{t('common:no-data-found')}</H4>
        </View>
      )}
    />
  );
}

export default CompanyServicesTab;
