import { useQuery } from '@tanstack/react-query';
import { CompanyTransformer, ProductsService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import {
  FilterByOrder,
  FilterPrice,
  FullScreenSpinner,
  SearchProduct
} from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';
import { H4, View, XStack } from 'tamagui';
import { ProductCard } from '../product-card/product-card';

export type ProductsCompanyTabProps = {
  company: CompanyTransformer;
};


export const ProductsCompanyTab: React.FC<ProductsCompanyTabProps> = ({
  company,
}) => {
  const router = useRouter();
  const { getUrlPrefix } = useAuth();
  const [orderBy, setOrderBy] = useState('cheapest');
  const [search, setSearch] = useState('');
  const { data, isLoading } = useQuery({
    queryFn: () =>
      ProductsService.fetchAllProduct({
        companyId: company.id as string,
      }),
    queryKey: ['ProductsService.fetchAllProduct', company.id],
  });
  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      onPress={() => {
        router.push(`${getUrlPrefix}/products/${item.id}`);
      }}
    >
      <ProductCard product={item} index={index} useShowButton={true} />
    </TouchableOpacity>
  );

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  return (
    <FlatList
      data={data?.data || []}
      renderItem={renderItem}
      keyExtractor={(item, index) => `product-${item.id}-${index}`}
      ListHeaderComponent={() => (
        <XStack flex={1} gap="$2" alignItems="center" paddingVertical={'$4'}>
          <FilterPrice />
          <FilterByOrder orderBy={orderBy} setOrderBy={setOrderBy} />
          <SearchProduct
            placeholder="ابحث عن منتج"
            value={search}
            onChangeText={setSearch}
          />
        </XStack>
      )}
      numColumns={2}
      columnWrapperStyle={{ gap: 10, padding: 10 }}
      contentContainerStyle={{ justifyContent: 'center' }}
      ListEmptyComponent={() => (
        <View flex={1} alignItems="center" gap="$2" padding="$4">
          <CustomIcon name="empty_data" size="$18" color="$color5" />
          <H4 color="#8590A2">{t('common:no-data-found')}</H4>
        </View>
      )}
    />
  );
};

export default ProductsCompanyTab;
