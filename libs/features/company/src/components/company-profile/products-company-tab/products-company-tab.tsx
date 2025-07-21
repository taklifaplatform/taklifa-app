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
import { ProductCard, ProductThumbCard } from '@zix/ui/common';
import { Sparkles } from '@tamagui/lucide-icons';

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
  const router = useRouter();
  const { getUrlPrefix } = useAuth();
  const [orderBy, setOrderBy] = useState('cheapest');
  const [search, setSearch] = useState<string>();
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery({
    queryFn: () =>
      ProductsService.fetchAllProduct({
        companyId: company.id as string,
        search: search && search.length > 0 ? search : undefined,
      }),
    queryKey: ['ProductsService.fetchAllProduct', company.id, search],
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
        router.push(`${getUrlPrefix}/products/${item.id}`);
      }}
    >
      <ProductThumbCard product={item} index={index} useShowButton={true} />
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
    <YStack>
      {!hideFilters && (
        <XStack flex={1} gap="$2" alignItems="center" paddingVertical={'$4'}>
          <FilterPrice />
          <FilterByOrder orderBy={orderBy} setOrderBy={setOrderBy} />
          <SearchProduct
            placeholder="أبحث على المنتجات"
            value={search}
            onChangeText={setSearch}
          />
        </XStack>
      )}
      {isLoading && <FullScreenSpinner />}
      {myStore ? (
        <FlatList
          data={data?.data || []}
          renderItem={renderMyStoreItem}
          keyExtractor={(item, index) => `product-${item.id}-${index}`}
          refreshing={isLoading}
          onRefresh={refetch}
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
          data={data?.data || []}
          renderItem={renderItem}
          keyExtractor={(item, index) => `product-${item.id}-${index}`}
          refreshing={isLoading}
          onRefresh={refetch}
          showsVerticalScrollIndicator={false}
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
      )}
    </YStack>
  );
};

export default ProductsCompanyTab;
