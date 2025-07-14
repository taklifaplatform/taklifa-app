import { PlusSquare } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useQuery } from '@tanstack/react-query';
import {
  ServiceCategoryTransformer,
  ServiceService,
  ServiceTransformer,
} from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { ActionSheetRef, FilterByOrder, ZixButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader } from '@zix/ui/layouts';
import { useFlatListQuery } from '@zix/utils';
import { t } from 'i18next';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'solito/router';
import { H4, Text, Theme, View, XStack, YStack } from 'tamagui';
import ServiceCard from '../../components/service-card';

export interface ServicesListScreenProps {
  showHeader: boolean;
}

// --- Types ---

interface CategoryListProps {
  categories: ServiceCategoryTransformer[];
  selectedCategory?: ServiceCategoryTransformer;
  onSelect: (cat?: ServiceCategoryTransformer) => void;
}

interface SubCategoryListProps {
  subCategories: ServiceCategoryTransformer[];
  selectedSubCategory?: ServiceCategoryTransformer;
  onSelect: (cat?: ServiceCategoryTransformer) => void;
}

// --- Memoized Components ---

const CategoryList = memo(
  ({ categories, selectedCategory, onSelect }: CategoryListProps) => (
    <FlatList<{ id: number | 'all'; name: string }>
      data={
        [{ id: 'all', name: 'خدمات: الكل' }, ...categories] as {
          id: number | 'all';
          name: string;
        }[]
      }
      keyExtractor={(item, index): string => `${item.id ?? index}`}
      renderItem={({ item }) => (
        <ZixButton
          theme={'accent'}
          key={item.id}
          size="$3"
          style={{ marginRight: 10 }}
          onPress={() =>
            item.id === 'all'
              ? onSelect(undefined)
              : onSelect(item as ServiceCategoryTransformer)
          }
          backgroundColor={
            selectedCategory?.id === item.id ||
            (!selectedCategory && item.id === 'all')
              ? '$color1'
              : '$color11'
          }
          borderRadius={10}
        >
          <Text color="#FFFFFF" fontSize={14} fontWeight="bold">
            {item.name}
          </Text>
        </ZixButton>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  ),
);

const SubCategoryList = memo(
  ({ subCategories, selectedSubCategory, onSelect }: SubCategoryListProps) =>
    subCategories?.length > 0 ? (
      <FlatList<{ id: number | 'all'; name: string }>
        data={
          [{ id: 'all', name: t('common:all') }, ...subCategories] as {
            id: number | 'all';
            name: string;
          }[]
        }
        keyExtractor={(item, index): string => `${item.id ?? index}`}
        renderItem={({ item }) => (
          <ZixButton
            theme={'accent'}
            key={item.id}
            style={{ marginRight: 10 }}
            variant={
              selectedSubCategory?.id === item.id ||
              (!selectedSubCategory && item.id === 'all')
                ? undefined
                : 'outlined'
            }
            borderColor={
              selectedSubCategory?.id === item.id ||
              (!selectedSubCategory && item.id === 'all')
                ? '$color1'
                : '$color8'
            }
            size="$2"
            onPress={() =>
              item.id === 'all'
                ? onSelect(undefined)
                : onSelect(item as ServiceCategoryTransformer)
            }
            backgroundColor={'$color3'}
            borderRadius={10}
          >
            <CustomIcon name={item?.icon} size={10} />
            <Text>{item.name}</Text>
          </ZixButton>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    ) : null,
);

const SearchCatFilters = memo(
  ({
    categories,
    selectedCategory,
    onSelectCategory,
    subCategories,
    selectedSubCategory,
    onSelectSubCategory,
  }: {
    categories: ServiceCategoryTransformer[];
    selectedCategory?: ServiceCategoryTransformer;
    onSelectCategory: (cat?: ServiceCategoryTransformer) => void;
    subCategories: ServiceCategoryTransformer[];
    selectedSubCategory?: ServiceCategoryTransformer;
    onSelectSubCategory: (cat?: ServiceCategoryTransformer) => void;
  }) => (
    <Theme reset>
      <YStack gap="$3" paddingVertical="$2">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={onSelectCategory}
        />
        <SubCategoryList
          subCategories={subCategories}
          selectedSubCategory={selectedSubCategory}
          onSelect={onSelectSubCategory}
        />
        {/* //تصفية حسب: */}
      </YStack>
    </Theme>
  ),
);

// --- Main Screen ---

export const ServicesListScreen: React.FC<ServicesListScreenProps> = ({
  showHeader = true,
}) => {
  useMixpanel('Services List Screen view');
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const actionSheetManagerRef = useRef<ActionSheetRef>(null);
  const toast = useToastController();
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<ServiceTransformer | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategoryTransformer>();
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<ServiceCategoryTransformer>();

  // sort direction
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  // sort by
  const [sortBy, setSortBy] = useState<'created_at' | 'price'>('created_at');
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const { data: servicesData, ...servicesQuery } = useFlatListQuery({
    initialPageParam: 1,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      ServiceService.listServices({
        perPage: 20,
        page: pageParam || 1,
        search: search,
        categoryId: selectedCategory?.id,
        subCategoryId: selectedSubCategory?.id,
        years: selectedYears.length > 0 ? selectedYears?.join(',') : undefined,
        sortBy: sortBy,
        sortDirection: sortDirection,
      }),
    queryKey: [
      'ServiceService.listServices',
      search,
      selectedCategory?.id,
      selectedSubCategory?.id,
      sortBy,
      sortDirection,
      selectedYears.join(','),
    ],
  });

  const { data: categoriesData } = useQuery({
    queryFn: () => ServiceService.listServiceCategories({}),
    queryKey: ['ServiceService.listServiceCategories'],
  });

  // Memoize subcategories
  const subCategories = useMemo(
    () => selectedCategory?.sub_categories || [],
    [selectedCategory],
  );

  // Memoize callbacks
  const handleSelectCategory = useCallback(
    (cat?: ServiceCategoryTransformer) => {
      setSelectedCategory(cat);
      setSelectedSubCategory(undefined);
      if (!cat) {
        setSelectedYears([]);
        setSortBy('created_at');
        setSortDirection('desc');
      }
    },
    [],
  );
  const handleSelectSubCategory = useCallback(
    (cat?: ServiceCategoryTransformer) => {
      setSelectedSubCategory(cat);
    },
    [],
  );
  const [orderBy, setOrderBy] = useState('cheapest');

  return (
    <View flex={1}>
      <AppHeader
        title={t('')}
        showSearchBar
        searchProps={{
          value: search,
          onChangeText: setSearch,
        }}
        headerRight={() => (
          <Theme reset>
            <Text
              fontSize={'$4'}
              fontWeight="bold"
              color="$color1"
              alignSelf="center"
              marginRight={10}
            >
              {t('common:market')}
            </Text>
            <ZixButton
              minWidth={180}
              alignSelf="center"
              marginRight={10}
              theme="accent"
              icon={<PlusSquare size="$1" color="$color1" />}
              onPress={() => {
                if (isLoggedIn) {
                  router.push(`/app/services/create`);
                } else {
                  router.push(`/auth/login`);
                }
              }}
              size={'$2'}
              fontWeight="500"
              textProps={{
                color: '$color1',
              }}
              backgroundColor="$color3"
            >
              أضف خدمات الأن
            </ZixButton>
          </Theme>
        )}
      />
      <YStack flex={1} padding={'$3'} position="relative">
        <SearchCatFilters
          categories={categoriesData?.data || []}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          subCategories={subCategories}
          selectedSubCategory={selectedSubCategory}
          onSelectSubCategory={handleSelectSubCategory}
        />
        <XStack
          justifyContent="flex-start"
          alignItems="center"
          gap="$2"
          padding="$4"
        >
          <Text>تصفية حسب:</Text>
          <FilterByOrder orderBy={orderBy} setOrderBy={setOrderBy} />
        </XStack>

        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={servicesQuery.isLoading}
          onRefresh={servicesQuery.refetch}
          onEndReached={servicesQuery.fetchNextPage}
          removeClippedSubviews={true}
          contentContainerStyle={{ gap: 20 }}
          initialNumToRender={10}
          style={{ flex: 1 }}
          data={(servicesData as ServiceTransformer[]) || []}
          keyExtractor={(item: ServiceTransformer, index: number): string =>
            `${item.id ?? index}`
          }
          renderItem={({ item, index }) => (
            <ServiceCard service={item} showHeader={showHeader} />
          )}
          ListEmptyComponent={
            <View flex={1} alignItems="center" gap="$2" paddingTop="$8">
              <CustomIcon name="empty_data" size="$18" color="$color5" />
              <H4 color="#8590A2">{t('common:no_services_found')}</H4>
            </View>
          }
        />
      </YStack>
    </View>
  );
};

export default ServicesListScreen;
