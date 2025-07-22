import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CompanyTransformer, ProductsService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import {
  FilterByOrder,
  FilterPrice,
  FullScreenSpinner,
  SearchProduct,
} from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';
import { H4, View, XStack, YStack } from 'tamagui';
import { ProductCard } from '@zix/ui/common';
import { Sparkles } from '@tamagui/lucide-icons';
import { useFlatListQuery } from '@zix/utils';
import { ProductThumbCard } from '@zix/features/store';

export type ProductsCompanyTabProps = {
  company: CompanyTransformer;
  hideFilters?: boolean;
  setShowSheet?: (show: boolean) => void;
  myStore?: boolean;
  onEditProduct?: (productId: string) => void;
};

export const ProductsCompanyTab: React.FC<ProductsCompanyTabProps> = ({
  company,
  hideFilters = false,
  setShowSheet,
  myStore = false,
  onEditProduct,
}) => {
  const router = useRouter();
  const { getUrlPrefix } = useAuth();
  const [orderBy, setOrderBy] = useState('cheapest');
  const [search, setSearch] = useState<string>();
  const queryClient = useQueryClient();
  //
  const { data, refetch, ...productsQuery } = useFlatListQuery({
    queryFn: ({ pageParam }: { pageParam: number }) =>
      ProductsService.fetchAllProduct({
        companyId: company.id as string,
        search: search && search.length > 0 ? search : undefined,
        perPage: 5,
        page: pageParam || 1,
        // orderBy: 'is_published',
        // orderDirection: 'asc',
        includeUnpublished: (!myStore ? 'false' : 'true') as any,
      }),
    queryKey: ['ProductsService.fetchAllProduct', company.id, search, myStore],
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['ProductsService.fetchAllProduct', company.id, search],
    });
  }, [search]);
  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <ProductCard
      product={item}
      index={index}
      setShowSheet={setShowSheet}
      useShowButton={true}
    />
  );

  const renderMyStoreItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={{
        paddingTop: 10,
      }}
      onPress={() => {
        if (setShowSheet) {
          setShowSheet(false);
        }
        // router.push(`${getUrlPrefix}/products/${item.id}`);
      }}
    >
      <ProductThumbCard
        product={item}
        index={index}
        useShowButton={true}
        onEditProduct={onEditProduct}
      />
      {!!item.created_with_ai && (
        <View
          theme="accent"
          position="absolute"
          top={24}
          left={10}
          backgroundColor="$color10"
          padding="$2"
          justifyContent="center"
          alignItems="center"
          borderRadius="$8"
        >
          <Sparkles size={20} color="$color1" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <YStack flex={1}>
      {!hideFilters && (
        <XStack gap="$2" alignItems="center" paddingVertical={'$4'}>
          <FilterPrice />
          <FilterByOrder orderBy={orderBy} setOrderBy={setOrderBy} />
          <SearchProduct
            placeholder="أبحث على المنتجات"
            value={search}
            onChangeText={setSearch}
          />
        </XStack>
      )}
      {productsQuery.refetch && <FullScreenSpinner />}
      {myStore ? (
        <FlatList
          data={data || []}
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
          columnWrapperStyle={{ gap: 15, paddingVertical: 10 }}
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
