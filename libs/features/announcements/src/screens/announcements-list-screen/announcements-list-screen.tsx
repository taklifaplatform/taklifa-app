import { MoreHorizontal, Pencil, Plus, Trash2 } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnnouncementCategoryTransformer, AnnouncementService, AnnouncementTransformer } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { ActionSheet, ActionSheetRef, DebugObject, UserAvatar, ZixButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader } from '@zix/ui/layouts';
import { ZixMediasListWidget } from '@zix/ui/widgets';
import { t } from 'i18next';
import { useRef, useState, useCallback, useMemo, memo } from 'react';
import { Alert, Dimensions, FlatList, Linking } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, H4, Image, Text, View, XStack, YStack } from 'tamagui';

export interface AnnouncementsListScreenProps {
  showHeader: boolean;
  driver: boolean;
  edit: boolean;
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
  onSelect: (cat: AnnouncementCategoryTransformer) => void;
}

interface AnnouncementItemProps {
  item: AnnouncementTransformer;
  showHeader: boolean;
  driver: boolean;
  edit: boolean;
  onContactPress: (item: AnnouncementTransformer) => void;
  onMorePress: (item: AnnouncementTransformer) => void;
  SCREEN_WIDTH: number;
}

// --- Memoized Components ---

const CategoryList = memo(({ categories, selectedCategory, onSelect }: CategoryListProps) => (
  <FlatList<{ id: number | 'all'; name: string }>
    data={[{ id: 'all', name: t('common:all') }, ...categories] as ({ id: number | 'all'; name: string })[]}
    keyExtractor={(item, index): string => `${item.id ?? index}`}
    renderItem={({ item }) => (
      <ZixButton
        themeInverse={selectedCategory?.id === item.id || (!selectedCategory && item.id === 'all')}
        key={item.id}
        style={{ marginRight: 10 }}
        onPress={() => item.id === 'all' ? onSelect(undefined) : onSelect(item as AnnouncementCategoryTransformer)}
      >
        <Text>{item.name}</Text>
      </ZixButton>
    )}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 16 }}
  />
));

const SubCategoryList = memo(({ subCategories, selectedSubCategory, onSelect }: SubCategoryListProps) => (
  <FlatList<AnnouncementCategoryTransformer>
    data={subCategories}
    keyExtractor={(item: AnnouncementCategoryTransformer, index: number): string => `${item.id ?? index}`}
    renderItem={({ item }) => (
      <ZixButton
        key={item.id}
        style={{ marginRight: 10 }}
        onPress={() => onSelect(item)}
        themeInverse={selectedSubCategory?.id === item.id}
      >
        <Text>{item.name}</Text>
      </ZixButton>
    )}
    horizontal
    showsHorizontalScrollIndicator={false}
  />
));

const AnnouncementItem = memo(({
  item,
  showHeader,
  driver,
  edit,
  onContactPress,
  onMorePress,
  SCREEN_WIDTH,
}: AnnouncementItemProps) => {
  const { user } = useAuth();

  return (
    <YStack
      backgroundColor='$color2'
      borderRadius={5}
      marginBottom={10}
      marginHorizontal={showHeader && '$4'}
      paddingBottom={'$4'}
    >
      <XStack
        gap="$10"
        onPress={() => onMorePress(item)}
        justifyContent='space-between' alignItems='center' padding={"$4"}
      >
        <XStack alignItems="center" gap="$2" flex={1}>
          <UserAvatar user={item?.user} size="$5" />
          <Text color='$color12' fontWeight="bold">
            {item?.user?.name || item?.user?.username}
          </Text>
        </XStack>
        <XStack gap="$4" alignItems='center'>
          {item?.user?.phone_number && <Button
            flex={0.1}
            backgroundColor='$gray7'
            icon={() => <CustomIcon name="call" color='$color12' size={'$1'} />}
            onPress={() => onContactPress(item)}
          />}
          {user?.id === item?.user?.id && <Button
            iconAfter={<MoreHorizontal />}
            onPress={() => onMorePress(item)}
          />}
        </XStack>
      </XStack>
      <YStack gap="$4" paddingHorizontal="$4">
        <XStack
          justifyContent='space-between'
          alignItems='center'
          borderBottomWidth={0.5}
          borderColor={'$color5'}
          paddingVertical={"$2"}
        >
          <Text fontWeight={'bold'} fontSize={'$3'}>{item?.title || ''}</Text>
          <XStack alignItems='center'>
            <Text fontWeight={'bold'} fontSize={'$3'}>{item?.price} {t('common:sar')}</Text>
          </XStack>
        </XStack>
        <Text numberOfLines={3}>{item?.description || ''}</Text>
        {item?.images && <ZixMediasListWidget medias={Array.isArray(item.images) ? item.images : []} paddingHorizontal={5} />}
      </YStack>
    </YStack>
  )
});

const SearchCatFilters = memo(({ categories, selectedCategory, onSelectCategory, subCategories, selectedSubCategory, onSelectSubCategory }: {
  categories: AnnouncementCategoryTransformer[];
  selectedCategory?: AnnouncementCategoryTransformer;
  onSelectCategory: (cat?: AnnouncementCategoryTransformer) => void;
  subCategories: AnnouncementCategoryTransformer[];
  selectedSubCategory?: AnnouncementCategoryTransformer;
  onSelectSubCategory: (cat: AnnouncementCategoryTransformer) => void;
}) => (
  <YStack gap={'$4'}>
    <CategoryList categories={categories} selectedCategory={selectedCategory} onSelect={onSelectCategory} />
    <SubCategoryList subCategories={subCategories} selectedSubCategory={selectedSubCategory} onSelect={onSelectSubCategory} />
  </YStack>
));

// --- Main Screen ---

export const AnnouncementsListScreen: React.FC<AnnouncementsListScreenProps> = ({
  showHeader = true,
  driver = false,
  edit = false,
}) => {
  useMixpanel('Announcements List Screen view')
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const router = useRouter();
  const { user, getUrlPrefix, isLoggedIn } = useAuth();
  const actionSheetManagerRef = useRef<ActionSheetRef>(null);
  const queryClient = useQueryClient();
  const toast = useToastController();
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<AnnouncementTransformer | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<AnnouncementCategoryTransformer>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<AnnouncementCategoryTransformer>();

  const { data: categoriesData } = useQuery({
    queryFn: () => AnnouncementService.listAnnouncementCategories({}),
    queryKey: ['AnnouncementService.listAnnouncementCategories'],
  });

  const { data, refetch, isLoading } = useQuery({
    queryFn: () => AnnouncementService.listAnnouncements({
      search: search,
      categoryId: selectedCategory?.id,
      subCategoryId: selectedSubCategory?.id,
    }),
    queryKey: ['AnnouncementService.listAnnouncements', search, selectedCategory?.id, selectedSubCategory?.id],
  });

  // on Contact button press
  const onContactPress = useCallback((item: AnnouncementTransformer) => {
    const phoneNumber = item?.user?.phone_number;
    if (!phoneNumber) return;
    Linking.openURL(`tel:${phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`}`);
  }, []);

  const { mutate } = useMutation({
    mutationFn: () => AnnouncementService.deleteAnnouncement({
      announcement: selectedItem?.id ? String(selectedItem.id) : '',
    }),
    onSuccess: () => {
      refetch();
      toast.show('Announcement Removed Successfully!');
    },
    onError: () => {
      toast.show('Failed to remove announcement');
    },
  });

  // Memoize subcategories
  const subCategories = useMemo(() => [], [selectedCategory]);

  // Memoize callbacks
  const handleSelectCategory = useCallback((cat?: AnnouncementCategoryTransformer) => {
    setSelectedCategory(cat);
    setSelectedSubCategory(undefined);
  }, []);
  const handleSelectSubCategory = useCallback((cat: AnnouncementCategoryTransformer) => {
    setSelectedSubCategory(cat);
  }, []);

  const handleMorePress = useCallback((item: AnnouncementTransformer) => {
    setSelectedItem(item);
    actionSheetManagerRef.current?.open();
  }, []);

  // ActionSheet actions
  const actionSheetActions = useMemo(() => [
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
        Alert.alert(
          t('common:delete'),
          t('common:confirm-delete'),
          [
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
          ],
        );
      },
    },
  ], [getUrlPrefix, mutate, router, selectedItem]);

  return (
    <View flex={1}>
      <AppHeader
        title={t('common:market')}
        showSearchBar
        searchProps={{
          value: search,
          onChangeText: setSearch,
        }}
        renderAfterSearchBar={() => (
          <SearchCatFilters
            categories={categoriesData?.data || []}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            subCategories={subCategories}
            selectedSubCategory={selectedSubCategory}
            onSelectSubCategory={handleSelectSubCategory}
          />
        )}
      />
      <YStack flex={1} paddingTop={15} position='relative'>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={refetch}
          style={{ flex: 1 }}
          data={data?.data as AnnouncementTransformer[] || []}
          keyExtractor={(item: AnnouncementTransformer, index: number): string => `${item.id ?? index}`}
          renderItem={({ item, index }) => (
            <AnnouncementItem
              item={item}
              showHeader={showHeader}
              driver={driver}
              edit={edit}
              onContactPress={onContactPress}
              onMorePress={handleMorePress}
              SCREEN_WIDTH={SCREEN_WIDTH}
            />
          )}
          ListEmptyComponent={
            <View flex={1} alignItems='center' gap="$8" paddingTop="$8">
              <CustomIcon name="empty_data" size="$18" color="$color5" />
              <H4>{t('common:no_services_found')}</H4>
            </View>
          }
        />
        <XStack padding="$4" position='absolute' bottom={0} left={0} right={0}>
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
            أضف اعلان
          </ZixButton>
        </XStack>
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
}

export default AnnouncementsListScreen;
