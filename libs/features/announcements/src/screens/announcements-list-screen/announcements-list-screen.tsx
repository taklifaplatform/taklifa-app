import {
  Building2,
  Clock,
  MapPin,
  PlusSquare,
  Rocket
} from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useQuery } from '@tanstack/react-query';
import {
  AnnouncementCategoryTransformer,
  AnnouncementService,
  AnnouncementTransformer
} from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import {
  ActionSheetRef,
  FilterByOrder,
  TitleInfo,
  ZixButton
} from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader } from '@zix/ui/layouts';
import { useFlatListQuery } from '@zix/utils';
import { Image } from 'expo-image';
import { t } from 'i18next';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Linking,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'solito/router';
import { Button, H4, Stack, Text, Theme, View, XStack, YStack } from 'tamagui';
import AnnouncementCard from '../../components/announcement-card';

export interface AnnouncementsListScreenProps {
  showHeader: boolean;
}

// --- Types ---

interface CategoryListProps {
  categories: AnnouncementCategoryTransformer[];
  selectedCategory?: AnnouncementCategoryTransformer;
  onSelect: (cat?: AnnouncementCategoryTransformer) => void;
}

interface SubCategoryListProps {
  subCategories: AnnouncementCategoryTransformer[];
  selectedSubCategory?: AnnouncementCategoryTransformer;
  onSelect: (cat?: AnnouncementCategoryTransformer) => void;
}

interface AnnouncementItemProps {
  item: AnnouncementTransformer;
  showHeader: boolean;
  onContactPress: (item: AnnouncementTransformer) => void;
  onMorePress: (item: AnnouncementTransformer) => void;
  SCREEN_WIDTH: number;
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
              : onSelect(item as AnnouncementCategoryTransformer)
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
                : onSelect(item as AnnouncementCategoryTransformer)
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

// const AnnouncementItem = memo(
//   ({
//     item,
//     showHeader,
//   }: AnnouncementItemProps) => {
//     const { user } = useAuth();
//     const router = useRouter();

//     return (
//       <TouchableOpacity
//         onPress={() => {
//           router.push(`/app/products/${item.id}`);
//         }}
//       >
//         <XStack
//           theme={'accent'}
//           backgroundColor={user?.id === item?.user?.id ? '$color3' : '#F1F2F4'}
//           borderWidth={1}
//           borderColor={user?.id === item?.user?.id ? '$color1' : '#F1F2F4'}
//           borderRadius="$4"
//           marginHorizontal={showHeader ? '$4' : undefined}
//           padding="$4"
//           gap={'$3'}
//           justifyContent="center"
//           alignItems="center"
//         >
//           {user?.id === item?.user?.id && (
//           <XStack
//             position="absolute"
//             top={-15}
//             left={10}
//             gap={'$2'}
//             padding="$2"
//             backgroundColor="$color3"
//             alignItems="center"
//             justifyContent="center"
//             borderRadius={'$6'}
//             borderWidth={1}
//             borderColor="$color1"
//           >
//             <Rocket size={15} color="$color1" />
//             <Text fontSize={'$1'} fontWeight={'600'} color="$color1">
//               خدماتي
//             </Text>
//           </XStack>
//           )}
//           {/* //image */}
//           <YStack>
//             {item?.images?.length ? (
//               <Image
//                 source={{ uri: item?.images[0]?.url }}
//                 style={{
//                   width: 100,
//                   height: 120,
//                   borderRadius: 10,
//                 }}
//               />
//             ) : (
//               <Theme reset>
//                 <View
//                   width={100}
//                   height={120}
//                   backgroundColor="$color2"
//                   borderRadius={10}
//                   borderWidth={1}
//                   borderColor="$color8"
//                   overflow="hidden"
//                   alignItems="center"
//                   justifyContent="center"
//                 >
//                   <CustomIcon name="image-blank" size={90} color="$color2" />
//                 </View>
//               </Theme>
//             )}
//           </YStack>
//           <YStack flex={1} justifyContent="space-between" gap="$2">
//             {/* title */}
//             <Text
//               textAlign="left"
//               fontWeight="700"
//               fontSize={'$2'}
//               numberOfLines={1}
//             >
//               {item?.title || ''}
//             </Text>
//             <TitleInfo
//               icon={<Building2 size={15} color="#000000" />}
//               title={item?.description || ''}
//               flex={1}
//               textAlign="left"
//             />
//             <Stack
//               flexDirection="row"
//               flexWrap="wrap"
//               alignItems="center"
//               gap="$3"
//               theme={showHeader ? 'accent' : undefined}
//             >
//               {!!item?.city && (
//                 <TitleInfo
//                   icon={<MapPin size={15} color="#000000" />}
//                   title={item.city}
//                   textAlign="left"
//                 />
//               )}
//               <TitleInfo
//                 icon={<Clock size={15} color="#000000" />}
//                 title={'منذ ساعة'}
//               />
//             </Stack>
//             {/* //price */}

//             {/* // button More information */}
//             <XStack justifyContent="space-between" marginTop={'$4'}>
//               <XStack alignItems="center" gap={'$2'}>
//                 <Text fontWeight={'bold'} fontSize={'$5'}>
//                   {item?.price || '0'}
//                 </Text>
//                 <CustomIcon name="riyal" size={'$2'} color="#000000" />
//               </XStack>
//               <Button
//                 theme={'accent'}
//                 pressStyle={{
//                   backgroundColor: 'gray'
//                 }}
//                 backgroundColor="transparent"
//                 borderWidth={1}
//                 borderColor="$color11"
//                 width={140}
//                 height={35}
//                 borderRadius={10}
//                 justifyContent="center"
//                 alignItems="center"
//                 onPress={() => router.push(`/app/products/${item.id}`)}
//               >
//                 <Text fontSize={'$1'} fontWeight={'bold'} color="$color11">
//                   شاهد التفاصيل
//                 </Text>
//               </Button>
//             </XStack>
//           </YStack>
//         </XStack>
//       </TouchableOpacity>
//     );
//   },
// );

const SearchCatFilters = memo(
  ({
    categories,
    selectedCategory,
    onSelectCategory,
    subCategories,
    selectedSubCategory,
    onSelectSubCategory,
  }: {
    categories: AnnouncementCategoryTransformer[];
    selectedCategory?: AnnouncementCategoryTransformer;
    onSelectCategory: (cat?: AnnouncementCategoryTransformer) => void;
    subCategories: AnnouncementCategoryTransformer[];
    selectedSubCategory?: AnnouncementCategoryTransformer;
    onSelectSubCategory: (cat?: AnnouncementCategoryTransformer) => void;
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

export const AnnouncementsListScreen: React.FC<
  AnnouncementsListScreenProps
> = ({ showHeader = true }) => {
  useMixpanel('Announcements List Screen view');
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const router = useRouter();
  const { getUrlPrefix, isLoggedIn } = useAuth();
  const actionSheetManagerRef = useRef<ActionSheetRef>(null);
  const toast = useToastController();
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] =
    useState<AnnouncementTransformer | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<AnnouncementCategoryTransformer>();
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<AnnouncementCategoryTransformer>();

  // sort direction
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  // sort by
  const [sortBy, setSortBy] = useState<'created_at' | 'price'>('created_at');
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const { data: announcementsData, ...announcementsQuery } = useFlatListQuery({
    initialPageParam: 1,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      AnnouncementService.listAnnouncements({
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
      'AnnouncementService.listAnnouncements',
      search,
      selectedCategory?.id,
      selectedSubCategory?.id,
      sortBy,
      sortDirection,
      selectedYears.join(','),
    ],
  });

  const { data: categoriesData } = useQuery({
    queryFn: () => AnnouncementService.listAnnouncementCategories({}),
    queryKey: ['AnnouncementService.listAnnouncementCategories'],
  });

  // on Contact button press
  const onContactPress = useCallback((item: AnnouncementTransformer) => {
    const phoneNumber = item?.user?.phone_number;
    if (!phoneNumber) return;
    Linking.openURL(
      `tel:${phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`}`,
    );
  }, []);


  // Memoize subcategories
  const subCategories = useMemo(
    () => selectedCategory?.sub_categories || [],
    [selectedCategory],
  );

  // Memoize callbacks
  const handleSelectCategory = useCallback(
    (cat?: AnnouncementCategoryTransformer) => {
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
    (cat?: AnnouncementCategoryTransformer) => {
      setSelectedSubCategory(cat);
    },
    [],
  );

  const handleMorePress = useCallback((item: AnnouncementTransformer) => {
    setSelectedItem(item);
    actionSheetManagerRef.current?.open();
  }, []);


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
                  router.push(`/app/announcements/create`);
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
          refreshing={announcementsQuery.isLoading}
          onRefresh={announcementsQuery.refetch}
          onEndReached={announcementsQuery.fetchNextPage}
          removeClippedSubviews={true}
          contentContainerStyle={{ gap: 20 }}
          initialNumToRender={10}
          style={{ flex: 1 }}
          data={(announcementsData as AnnouncementTransformer[]) || []}
          keyExtractor={(
            item: AnnouncementTransformer,
            index: number,
          ): string => `${item.id ?? index}`}
          renderItem={({ item, index }) => (
            <AnnouncementCard
              announcement={item}
              showHeader={showHeader}
            />
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

export default AnnouncementsListScreen;
