import { Sparkles } from '@tamagui/lucide-icons';
import { CompanyTransformer, ProductsService } from '@zix/api';
import { ProductThumbCard } from '@zix/features/store';
import {
  FilterByOrder,
  FilterPrice,
  ProductCard,
  SearchProduct
} from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useFlatListQuery } from '@zix/utils';
import { useFocusEffect } from 'expo-router';
import { t } from 'i18next';
import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { H4, View, XStack, YStack } from 'tamagui';

export type ProductsCompanyTabProps = {
  company: CompanyTransformer;
  hideFilters?: boolean;
  setShowSheet?: (show: boolean) => void;
  myStore?: boolean;
};

export const ProductsCompanyTab: React.FC<ProductsCompanyTabProps> = ({
  company,
  hideFilters = false,
  setShowSheet,
  myStore = false,
}) => {
  const [orderBy, setOrderBy] = useState({
    type: undefined,
    direction: undefined,
  });
  const [priceRange, setPriceRange] = useState({
    min: undefined,
    max: undefined,
  });
  const [search, setSearch] = useState<string>();
  //
  const { data, ...productsQuery } = useFlatListQuery({
    queryFn: ({ pageParam }: { pageParam: number }) =>
      ProductsService.fetchAllProduct({
        companyId: company.id as string,
        search: search && search.length > 0 ? search : undefined,
        perPage: 5,
        page: pageParam || 1,
        orderBy: orderBy.type,
        orderDirection: orderBy.direction,
        includeUnpublished: (!myStore ? undefined : 'true') as any,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      }),
    queryKey: [
      'ProductsService.fetchAllProduct',
      company.id,
      search,
      myStore,
      orderBy.direction,
      orderBy.type,
      priceRange,
    ],
  });

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        productsQuery.refetch()
      }, 1000)
    }, [])
  )

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <ProductCard
      product={item}
      index={index}
      setShowSheet={setShowSheet}
      useShowButton={true}
    />
  );

  const renderMyStoreItem = ({ item, index }: { item: any; index: number }) => (
    <>
      <ProductThumbCard product={item} index={index} useShowButton={true} />
      {!!item.created_with_ai && (
        <View
          theme="accent"
          position="absolute"
          top={13}
          left={5}
          backgroundColor="#EFFEF6"
          padding="$2"
          justifyContent="center"
          alignItems="center"
          borderRadius="$8"
        >
          <Sparkles size={20} color="$color1" />
        </View>
      )}
    </>
  );

  return (
    <YStack flex={1}>
      {!hideFilters && (
        <XStack gap="$2" alignItems="center" paddingVertical={'$4'}>
          <FilterPrice priceRange={priceRange} setPriceRange={setPriceRange} />
          <FilterByOrder orderBy={orderBy} setOrderBy={setOrderBy} />
          <SearchProduct
            placeholder="أبحث على المنتجات"
            value={search}
            onChangeText={setSearch}
          />
        </XStack>
      )}
      {myStore ? (
        <FlatList
          data={data || []}
          refreshControl={
            <RefreshControl
              refreshing={productsQuery.isLoading}
              onRefresh={productsQuery.refetch}
            />
          }
          refreshing={productsQuery.isLoading}
          onRefresh={productsQuery.refetch}
          onEndReached={productsQuery.fetchNextPage}
          removeClippedSubviews={true}
          initialNumToRender={10}
          renderItem={renderMyStoreItem}
          keyExtractor={(item, index) => `product-${item.id}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: 'center' }}
          ListEmptyComponent={() => (
            <View flex={1} alignItems="center" gap="$2" padding="$4">
              <CustomIcon name="empty_data" size="$18" color="$color5" />
              <H4 color="#8590A2">{t('common:no-data-found')}</H4>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={data || []}
          refreshing={productsQuery.isLoading}
          onRefresh={productsQuery.refetch}
          onEndReached={productsQuery.fetchNextPage}
          removeClippedSubviews={true}
          initialNumToRender={10}
          renderItem={renderItem}
          keyExtractor={(item, index) => `product-${item.id}-${index}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ gap: 19, paddingVertical: 10 }}
          contentContainerStyle={{ justifyContent: 'center' }}
          ListEmptyComponent={() => (
            <View flex={1} alignItems="center" gap="$2" padding="$4">
              <CustomIcon name="empty_data" size="$18" color="$color5" />
              <H4 color="#8590A2">{t('common:no-data-found')}</H4>
            </View>
          )}
        />
      )}
    </YStack>
  );
};

export default ProductsCompanyTab;
