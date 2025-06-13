import {
  MoreHorizontal,
  Pencil,
  Plus,
  PlusCircle,
  Search,
  Trash2,
  Calendar,
  ArrowDown,
  ChevronDown,
} from '@tamagui/lucide-icons';
import { Check as CheckIcon } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  AnnouncementCategoryTransformer,
  AnnouncementService,
  AnnouncementTransformer,
} from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import {
  ActionSheet,
  ActionSheetRef,
  UserAvatar,
  ZixButton,
} from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader } from '@zix/ui/layouts';
import { ZixMediasListWidget } from '@zix/ui/widgets';
import { t } from 'i18next';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'solito/router';
import {
  Button,
  H4,
  Text,
  Theme,
  View,
  XStack,
  YStack,
  Checkbox,
} from 'tamagui';
import { Image } from 'expo-image';
import moment from 'moment';
import { useFlatListQuery } from '@zix/utils';
import { ZixDialog } from '@zix/ui/common';

export interface AnnouncementsListScreenProps {
  showHeader: boolean;
  search: string;
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
        [{ id: 'all', name: t('common:all') }, ...categories] as {
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
          borderWidth={1}
          borderColor={
            selectedCategory?.id === item.id ||
            (!selectedCategory && item.id === 'all')
              ? '$color9'
              : '$color8'
          }
          backgroundColor={
            selectedCategory?.id === item.id ||
            (!selectedCategory && item.id === 'all')
              ? '$color8'
              : '$color2'
          }
          borderRadius={10}
        >
          <Text>{item.name}</Text>
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

const AnnouncementItem = memo(
  ({
    item,
    showHeader,
    onContactPress,
    onMorePress,
  }: AnnouncementItemProps) => {
    const { user } = useAuth();
    const router = useRouter();
    return (
      <TouchableOpacity
        onPress={() => router.push(`/app/announcements/${item.id}`)}
      >
        <XStack
          theme={user?.id === item?.user?.id ? 'accent' : undefined}
          backgroundColor={user?.id === item?.user?.id ? '$color2' : '$color2'}
          borderWidth={1}
          borderColor={user?.id === item?.user?.id ? '$color9' : '$color2'}
          borderRadius="$2"
          marginHorizontal={showHeader ? '$4' : undefined}
          padding="$2"
          gap={'$3'}
          justifyContent="center"
          alignItems="center"
        >
          {/* //image */}
          <YStack gap={2}>
            {user?.id === item?.user?.id && (
              <Button
                width={55}
                size={16}
                textProps={{
                  fontSize: 8,
                  color: '$color12',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: -2,
                }}
                icon={
                  <CustomIcon name="advertisement" size={10} color="$color12" />
                }
                borderRadius={10}
                position="absolute"
                top={-20}
                right={25}
              >
                اعلاناتي
              </Button>
            )}
            {item?.images?.length ? (
              <Image
                source={{ uri: item?.images[0]?.url }}
                style={{
                  width: 80,
                  height: 90,
                  borderRadius: 10,
                }}
              />
            ) : (
              <Theme reset>
                <View
                  width={80}
                  height={90}
                  backgroundColor="$color2"
                  borderRadius={10}
                  borderWidth={1}
                  borderColor="$color8"
                  overflow="hidden"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CustomIcon name="image-blank" size={90} color="$color2" />
                </View>
              </Theme>
            )}
          </YStack>
          <YStack
            flex={1}
            justifyContent="space-between"
            gap="$3"
            paddingVertical="$2"
          >
            {/* title */}
            <Text
              textAlign="left"
              fontWeight="700"
              fontSize={'$2'}
              numberOfLines={1}
            >
              {item?.title || ''}
            </Text>
            {/* //user info */}

            <XStack
              alignItems="center"
              gap="$3"
              theme={showHeader ? 'accent' : undefined}
            >
              <XStack flex={1} alignItems="center" gap="$1">
                <UserAvatar user={item?.user} size={10} />
                <Text color="$color12" fontSize={10} numberOfLines={1}>
                  {item?.user?.name || item?.user?.username}
                </Text>
              </XStack>
              {!!item?.city && (
                <XStack flex={1} alignItems="center" gap="$1">
                  <CustomIcon name="location" size={10} color="$color8" />
                  <Text color="$color12" fontSize={10} numberOfLines={1}>
                    {item.city}
                  </Text>
                </XStack>
              )}
              <XStack flex={1} alignItems="center" gap="$1">
                <CustomIcon name="time" size={10} color="$color8" />
                <Text fontSize={10} color="$color12">
                  {moment(item?.created_at).fromNow()}
                </Text>
              </XStack>
            </XStack>
            {/* //price */}

            {/* // button More information */}
            <XStack justifyContent="space-between">
              <XStack alignItems="center" gap={'$2'}>
                <Text fontWeight={'bold'} fontSize={'$3'}>
                  {item?.price || '0'}
                </Text>
                <CustomIcon
                  name="saudi-riyal-symbol"
                  size={'$1'}
                  color="$color12"
                />
              </XStack>
              <Button
                backgroundColor={'$color4'}
                size="$2"
                borderRadius={5}
                onPress={() => {
                  router.push(`/app/announcements/${item.id}`);
                }}
                iconAfter={() => (
                  <CustomIcon name="arrow-right" color="$color12" size={'$1'} />
                )}
                textProps={{
                  fontSize: 10,
                  color: '$color12',
                  fontWeight: 'bold',
                }}
              >
                {t('shipment:more-information')}
              </Button>
            </XStack>
          </YStack>
        </XStack>
      </TouchableOpacity>
    );
  },
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
  const [sortSheetOpen, setSortSheetOpen] = useState(false);
  const [sortType, setSortType] = useState<
    'date_desc' | 'date_asc' | 'price_desc' | 'price_asc'
  >('date_desc');
  const [priceSheetOpen, setPriceSheetOpen] = useState(false);
  const [dateSheetOpen, setDateSheetOpen] = useState(false);
  const [yearSheetOpen, setYearSheetOpen] = useState(false);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const { data: announcementsDataRaw, ...announcementsQuery } =
    useFlatListQuery({
      initialPageParam: 1,
      queryFn: ({ pageParam }: { pageParam: number }) =>
        AnnouncementService.listAnnouncements({
          perPage: 20,
          page: pageParam || 1,
          search: search,
          categoryId: selectedCategory?.id,
          subCategoryId: selectedSubCategory?.id,
          ...(selectedYears.length > 0 ? { years: selectedYears } : {}),
        }),
      queryKey: [
        'AnnouncementService.listAnnouncements',
        search,
        selectedCategory?.id,
        selectedSubCategory?.id,
        sortType,
        selectedYears.join(','),
      ],
    });

  // Liste des années générée dynamiquement à partir des annonces
  const YEARS = useMemo(() => {
    const arr = Array.isArray(announcementsDataRaw)
      ? announcementsDataRaw
      : announcementsDataRaw?.data || [];
    const yearsSet = new Set<string>();
    arr.forEach((item: any) => {
      const year = item.metadata?.model_year || (item.created_at ? new Date(item.created_at).getFullYear() : undefined);
      if (year) yearsSet.add(String(year));
    });
    // Ajoute les années fixes si absentes
    ['2025', '2024', '2023', '2022', '2020', '2019', '2000'].forEach(y => yearsSet.add(y));
    const yearsArr = Array.from(yearsSet);
    if (yearsArr.length === 0) yearsArr.push(String(new Date().getFullYear()));
    return yearsArr.sort((a, b) => Number(b) - Number(a));
  }, [announcementsDataRaw]);

  const { data: categoriesData } = useQuery({
    queryFn: () => AnnouncementService.listAnnouncementCategories({}),
    queryKey: ['AnnouncementService.listAnnouncementCategories'],
  });

  // Tri côté client
  const announcementsData = useMemo(() => {
    if (!announcementsDataRaw) return [];
    let arr = Array.isArray(announcementsDataRaw)
      ? announcementsDataRaw
      : announcementsDataRaw?.data || [];
    // Filtrage par années sélectionnées
    if (selectedYears.length > 0) {
      arr = arr.filter((item: any) =>
        selectedYears.includes(
          String(item.metadata?.model_year || (item.created_at ? new Date(item.created_at).getFullYear() : ''))
        )
      );
    }
    if (sortType === 'price_desc') {
      return [...arr].sort(
        (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0),
      );
    }
    if (sortType === 'price_asc') {
      return [...arr].sort(
        (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0),
      );
    }
    if (sortType === 'date_asc') {
      return [...arr].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    }
    // date_desc par défaut
    return [...arr].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [announcementsDataRaw, sortType, selectedYears]);

  // on Contact button press
  const onContactPress = useCallback((item: AnnouncementTransformer) => {
    const phoneNumber = item?.user?.phone_number;
    if (!phoneNumber) return;
    Linking.openURL(
      `tel:${phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`}`,
    );
  }, []);

  const { mutate } = useMutation({
    mutationFn: () =>
      AnnouncementService.deleteAnnouncement({
        announcement: selectedItem?.id ? String(selectedItem.id) : '',
      }),
    onSuccess: () => {
      refetch();
      toast.show(t('common:announcement-removed-successfully'));
    },
    onError: () => {
      toast.show(t('common:failed-to-remove-announcement'));
    },
  });

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

  // ActionSheet actions
  const actionSheetActions = useMemo(
    () => [
      {
        name: t('common:edit'),
        icon: <Pencil size="$1" color="$color10" />,
        onPress: () => {
          actionSheetManagerRef.current?.close();
          router.push(`/app/announcements/${selectedItem?.id}/edit`);
        },
      },
      {
        theme: 'error',
        name: t('common:delete'),
        icon: <Trash2 size="$1" color="$color10" />,
        onPress: () => {
          Alert.alert(t('common:delete'), t('common:confirm-delete'), [
            {
              text: t('common:cancel'),
              onPress: () => actionSheetManagerRef.current?.close(),
              style: 'cancel',
            },
            {
              text: t('common:remove'),
              style: 'destructive',
              onPress: () => {
                actionSheetManagerRef.current?.close();
                mutate();
              },
            },
          ]);
        },
      },
    ],
    [selectedItem],
  );

  const filters = [
    {
      key: 'price',
      label: 'السعر',
      options: [
        {
          label: 'الأغلى أولاً',
          value: 'price_desc',
          name: (
            <XStack
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              theme="accent"
            >
              <Text fontWeight={sortType === 'price_desc' ? 'bold' : 'normal'}>
                الأغلى أولاً
              </Text>
              <CustomIcon
                name="radio_button_checked"
                color={sortType === 'price_desc' ? '$color9' : 'gray'}
              />
            </XStack>
          ),
          onPress: () => {
            setSortType('price_desc');
            setPriceSheetOpen(false);
          },
        },
        {
          label: 'الأرخص أولاً',
          value: 'price_asc',
          name: (
            <XStack
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              theme="accent"
            >
              <Text fontWeight={sortType === 'price_asc' ? 'bold' : 'normal'}>
                الأرخص أولاً
              </Text>
              <CustomIcon
                name="radio_button_checked"
                color={sortType === 'price_asc' ? '$color9' : 'gray'}
              />
            </XStack>
          ),
          onPress: () => {
            setSortType('price_asc');
            setPriceSheetOpen(false);
          },
        },
      ],
    },
    {
      key: 'date',
      label: 'الوقت',
      options: [
        {
          label: 'الأحدث أولاً',
          value: 'date_desc',
          name: (
            <XStack
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              theme="accent"
            >
              <Text fontWeight={sortType === 'date_desc' ? 'bold' : 'normal'}>
                الأحدث أولاً
              </Text>
              <CustomIcon
                name="radio_button_checked"
                color={sortType === 'date_desc' ? '$color9' : 'gray'}
              />
            </XStack>
          ),
          onPress: () => {
            setSortType('date_desc');
            setDateSheetOpen(false);
          },
        },
        {
          label: 'الأقدم أولاً',
          value: 'date_asc',
          name: (
            <XStack
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text fontWeight={sortType === 'date_asc' ? 'bold' : 'normal'}>
                الأقدم أولاً
              </Text>
              <CustomIcon
                name="radio_button_checked"
                color={sortType === 'date_asc' ? '$color9' : 'gray'}
              />
            </XStack>
          ),
          onPress: () => {
            setSortType('date_asc');
            setDateSheetOpen(false);
          },
        },
      ],
    },
  ];

  return (
    <View flex={1}>
      <AppHeader
        title={t('common:market')}
        showSearchBar
        searchProps={{
          value: search,
          onChangeText: setSearch,
        }}
        headerRight={() => (
          <XStack alignItems="center" gap="$2">
            <ZixButton
              theme="accent"
              icon={<PlusCircle size="$1" color="$color12" />}
              onPress={() => {
                if (isLoggedIn) {
                  router.push(`/app/announcements/create`);
                } else {
                  router.push(`/auth/login`);
                }
              }}
              backgroundColor={'#FF9325'}
              size={'$2'}
              textProps={{ fontSize: '$1', color: '$color12' }}
            >
              {t('common:add-announcement')}
            </ZixButton>

            <Search size="$1" color="$color12" />
          </XStack>
        )}
      />
      <YStack flex={1} paddingTop={15} position="relative">
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
          {/* Bouton tri année */}
          <ZixDialog
            title="السنة"
            open={yearSheetOpen}
            onOpenChange={setYearSheetOpen}
            contentPadding="$4"
            trigger={
              <Button
                iconAfter={<ChevronDown size="$1" color="$color12" />}
                size="$2"
                backgroundColor="$color1"
                borderRadius={8}
                borderWidth={1}
                borderColor="$color3"
                textProps={{
                  fontSize: 13,
                  color: '$color12',
                  fontWeight: 'bold',
                }}
                onPress={() => setYearSheetOpen(true)}
              >
                {selectedYears.length > 0
                  ? `${selectedYears.length} سنة`
                  : 'السنة'}
              </Button>
            }
          >
            <YStack>
              {YEARS.map((y) => (
                <XStack
                  key={y}
                  alignItems="center"
                  justifyContent="space-between"
                  gap="$2"
                  paddingVertical="$2"
                  cursor="pointer"
                  onPress={() => {
                    setSelectedYears((prev) =>
                      prev.includes(y)
                        ? prev.filter((val) => val !== y)
                        : [...prev, y],
                    );
                  }}
                >
                  <Text
                    fontWeight={selectedYears.includes(y) ? 'bold' : 'normal'}
                  >
                    {y}
                  </Text>
                  <Checkbox checked={selectedYears.includes(y)} id={y}>
                    <Checkbox.Indicator>
                      <CheckIcon size="$1" />
                    </Checkbox.Indicator>
                  </Checkbox>
                </XStack>
              ))}
            </YStack>
          </ZixDialog>
          {/* Bouton tri prix */}
          <Button
            iconAfter={<ChevronDown size="$1" color="$color12" />}
            size="$2"
            backgroundColor="$color1"
            borderRadius={8}
            onPress={() => setPriceSheetOpen(true)}
            borderWidth={1}
            borderColor="$color3"
            textProps={{
              fontSize: 13,
              color: '$color12',
              fontWeight: 'bold',
            }}
          >
            {sortType === 'price_desc'
              ? 'الأغلى أولاً'
              : sortType === 'price_asc'
                ? 'الأرخص أولاً'
                : 'السعر'}
          </Button>
          {/* Bouton tri date */}
          <Button
            iconAfter={<ChevronDown size="$1" color="$color12" />}
            size="$2"
            backgroundColor="$color1"
            borderRadius={8}
            onPress={() => setDateSheetOpen(true)}
            borderWidth={1}
            borderColor="$color3"
            textProps={{
              fontSize: 13,
              color: '$color12',
              fontWeight: 'bold',
            }}
          >
            {sortType === 'date_desc'
              ? 'الأحدث أولاً'
              : sortType === 'date_asc'
                ? 'الأقدم أولاً'
                : 'الوقت'}
          </Button>
        </XStack>
        {/* ActionSheet pour le prix */}
        <ActionSheet
          open={priceSheetOpen}
          onOpenChange={setPriceSheetOpen}
          snapPoints={[33, 25]}
          title={t('ترتيب حسب السعر')}
          actions={filters.find((f) => f.key === 'price')?.options || []}
        />
        {/* ActionSheet pour la date */}
        <ActionSheet
          open={dateSheetOpen}
          onOpenChange={setDateSheetOpen}
          snapPoints={[33, 25]}
          title={t('ترتيب حسب الوقت')}
          actions={filters.find((f) => f.key === 'date')?.options || []}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={announcementsQuery.isLoading}
          onRefresh={announcementsQuery.refetch}
          onEndReached={announcementsQuery.fetchNextPage}
          removeClippedSubviews={true}
          contentContainerStyle={{ gap: 10 }}
          initialNumToRender={10}
          style={{ flex: 1 }}
          data={(announcementsData as AnnouncementTransformer[]) || []}
          keyExtractor={(
            item: AnnouncementTransformer,
            index: number,
          ): string => `${item.id ?? index}`}
          renderItem={({ item, index }) => (
            <AnnouncementItem
              item={item}
              showHeader={showHeader}
              onContactPress={onContactPress}
              onMorePress={handleMorePress}
              SCREEN_WIDTH={SCREEN_WIDTH}
            />
          )}
          ListEmptyComponent={
            <View flex={1} alignItems="center" gap="$8" paddingTop="$8">
              <CustomIcon name="empty_data" size="$18" color="$color5" />
              <H4>{t('common:no_services_found')}</H4>
            </View>
          }
        />

        {/* <XStack padding="$4" position='absolute' bottom={0} left={0} right={0}>
          <ZixButton
            theme='accent'
            icon={<Plus size="$1" color="$color12" />}
            onPress={() => {
              if (isLoggedIn) {
                router.push(`/app/announcements/create`)
              } else {
                router.push(`/auth/login`)
              }
            }}
          >
            {t('common:add-announcement')}
          </ZixButton>
        </XStack> */}
        {/* ActionSheet for edit/delete */}
        <ActionSheet
          snapPoints={[33, 25]}
          ref={actionSheetManagerRef}
          title={t('common:settings')}
          actions={actionSheetActions}
        />
      </YStack>
    </View>
  );
};

export default AnnouncementsListScreen;
