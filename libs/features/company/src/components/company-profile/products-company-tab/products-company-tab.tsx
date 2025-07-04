import {
  ChevronUp,
  Circle,
  CircleCheck,
  Filter,
  Search,
} from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { CompanyTransformer, ServicesService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import {
  FilterByOrder,
  IFilterOption,
  ZixDialog,
  ZixSlider,
} from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';
import { H4, Input, Text, Theme, View, XStack, YStack } from 'tamagui';
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

  const { data } = useQuery({
    queryFn: () =>
      ServicesService.listCompanyServices({
        company: company.id as string,
      }),
    queryKey: ['ServicesService.listCompanyServices', company.id],
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

  const renderFilterProducts = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

    return (
      <ZixDialog
        title={'الفلتر'}
        open={isOpen}
        onOpenChange={setIsOpen}
        contentPadding="$1"
        snapPoints={[25, 50]}
        disableRemoveScroll
        trigger={
          <XStack
            theme={'accent'}
            backgroundColor={'transparent'}
            borderRadius="$4"
            alignItems="center"
            paddingHorizontal="$2"
            height="$3"
            borderWidth={1}
            borderColor="$color0"
            gap="$2"
          >
            <Text fontWeight="bold" fontSize={'$3'}>
              الفلتر
            </Text>
            <Filter size={20} color="$color0" />
          </XStack>
        }
      >
        <XStack flex={1} gap="$4" padding="$4">
          <YStack gap="$4" alignItems="center" justifyContent="center">
            <Text>السعر</Text>
            <XStack width="100%" justifyContent="center" gap="$4">
              <XStack>
                <Text fontWeight="600" fontSize={'$3'}>
                  {priceRange[1] * 6000}
                </Text>
                <CustomIcon name="riyal" size="$1" />
              </XStack>
              <Text fontWeight="600" fontSize={'$3'}>
                {' '}
                -{' '}
              </Text>

              <XStack>
                <Text fontWeight="600" fontSize={'$3'}>
                  {priceRange[0] * 100}
                </Text>
                <CustomIcon name="riyal" size="$1" />
              </XStack>
            </XStack>
            <ZixSlider
              min={0}
              max={10}
              step={1}
              values={priceRange}
              onValuesChange={(values) => setPriceRange(values)}
            />
          </YStack>
        </XStack>
      </ZixDialog>
    );
  };

  const renderSearch = () => {
    return (
      <XStack
        theme={'accent'}
        backgroundColor={'transparent'}
        borderRadius="$4"
        alignItems="center"
        paddingHorizontal="$2"
        height="$3"
        borderWidth={1}
        borderColor="$color0"
        gap="$2"
      >
        <Input
          placeholder="ابحث عن منتج"
          backgroundColor="transparent"
          borderWidth={0}
        />
        <Search size={20} color="$color0" />
      </XStack>
    );
  };

  return (
    <FlatList
      data={data?.data || []}
      renderItem={renderItem}
      keyExtractor={(item, index) => `product-${item.id}-${index}`}
      ListHeaderComponent={() => (
        <XStack flex={1} gap="$2" alignItems="center" paddingVertical={'$4'}>
          {renderFilterProducts()}
          <FilterByOrder orderBy={orderBy} setOrderBy={setOrderBy} />
          {renderSearch()}
        </XStack>
      )}
      numColumns={2}
      columnWrapperStyle={{ gap: 10, padding: 10 }}
      contentContainerStyle={{ justifyContent: 'center' }}
      ListEmptyComponent={() => (
        <View flex={1} alignItems="center" gap="$8" padding="$4">
          <CustomIcon name="empty_data" size="$18" color="$color5" />
          <H4>{t('common:no-data-found')}</H4>
        </View>
      )}
    />
  );
};

export default ProductsCompanyTab;
