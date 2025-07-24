import { FileDown, RefreshCw, ShoppingBag } from '@tamagui/lucide-icons';
import { GroupedCompanyItems, useCart, useMixpanel } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useCallback, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Button, H4, Spinner, Text, View, XStack, YStack } from 'tamagui';
import { CostDetailComponent } from '../../components/cost-detail-component';

export interface ServicesListScreenProps {
  showHeader?: boolean;
}

export const CoastListScreen: React.FC<ServicesListScreenProps> = ({
  showHeader = true,
}) => {
  useMixpanel('Coast List Screen view');
  const {
    groupedCompanyItems,
    totalCost,
    totalItems,
    hasItems,
    isLoading,
    error,
    getCart,
    formatCurrency
  } = useCart();

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handleRefresh = useCallback(() => {
    getCart();
  }, [getCart]);



  const renderCoastTotal = useCallback(({ showButton = true }: { showButton?: boolean }) => {
    return (
      <YStack
        gap={'$4'}
        theme="accent"
        backgroundColor="$color10"
        padding={'$6'}
        borderRadius={'$4'}
        marginBottom={'$4'}
      >
        <XStack justifyContent="space-between" alignItems="center">
          <XStack gap={'$2'} alignItems="center">
            <ShoppingBag size={25} color="#000000" />
            <Text fontSize={'$5'} fontWeight={'bold'}>
              المجموع
            </Text>
            {totalItems > 0 && (
              <Text fontSize={'$3'} color="$color7" fontWeight={'600'}>
                ({totalItems} عنصر)
              </Text>
            )}
          </XStack>
          <XStack gap={'$2'} alignItems="center">
            <Text fontSize={'$6'} fontWeight={'bold'}>
              {formatCurrency(totalCost)}
            </Text>
            <CustomIcon name="riyal" size={'$3'} color="#000000" />
          </XStack>
        </XStack>

        {showButton && hasItems && (
          <Button
            backgroundColor="$color0"
            borderRadius="$5"
            height="$4"
            icon={<FileDown size={15} color="#FFFFFF" />}
            onPress={() => {
              // TODO: Implement download quote functionality
              console.log('Download quote pressed');
            }}
          >
            <Text fontSize={'$2'} fontWeight={'bold'} color="#FFFFFF">
              تحميل عرض السعر
            </Text>
          </Button>
        )}
      </YStack>
    );
  }, [totalCost, totalItems, hasItems, formatCurrency]);

  const renderGroupedItem = useCallback(({ item }: { item: GroupedCompanyItems }) => (
    <CostDetailComponent
      company={item.company}
      items={item.items}
    />
  ), []);

  const renderEmptyState = useCallback(() => (
    <View flex={1} alignItems="center" gap="$4" paddingTop="$12" paddingHorizontal="$4">
      <CustomIcon name="empty_coast" size="$18" color="$color5" />
      <YStack alignItems="center" gap="$2">
        <H4 color="#8590A2" textAlign="center">
          لم تقم بإضافة أي تكلفة بعد
        </H4>
        <Text fontSize="$3" color="$color7" textAlign="center">
          ابدأ بإضافة المنتجات إلى سلة التسوق لرؤية التكاليف هنا
        </Text>
      </YStack>
      <Button
        backgroundColor="$color0"
        borderRadius="$5"
        height="$4"
        marginTop="$4"
        onPress={handleRefresh}
        icon={<RefreshCw size={15} color="#FFFFFF" />}
      >
        <Text fontSize={'$3'} fontWeight={'bold'} color="#FFFFFF">
          تحديث
        </Text>
      </Button>
    </View>
  ), [handleRefresh]);

  const renderErrorState = useCallback(() => (
    <View flex={1} alignItems="center" gap="$4" paddingTop="$12" paddingHorizontal="$4">
      <CustomIcon name="error" size="$16" color="$red9" />
      <YStack alignItems="center" gap="$2">
        <H4 color="$red9" textAlign="center">
          حدث خطأ في تحميل البيانات
        </H4>
        <Text fontSize="$3" color="$color7" textAlign="center">
          {error || 'حدث خطأ غير متوقع'}
        </Text>
      </YStack>
      <Button
        backgroundColor="$color0"
        borderRadius="$5"
        height="$4"
        marginTop="$4"
        onPress={handleRefresh}
        icon={<RefreshCw size={15} color="#FFFFFF" />}
      >
        <Text fontSize={'$3'} fontWeight={'bold'} color="#FFFFFF">
          إعادة المحاولة
        </Text>
      </Button>
    </View>
  ), [error, handleRefresh]);

  const renderLoadingState = useCallback(() => (
    <View flex={1} alignItems="center" justifyContent="center" gap="$4">
      <Spinner size="large" color="$color0" />
      <Text fontSize="$4" color="$color7">
        جاري تحميل البيانات...
      </Text>
    </View>
  ), []);

  const getKeyExtractor = useCallback((item: GroupedCompanyItems) =>
    item.company.id || `company-${Math.random()}`, []
  );

  // Show loading state on initial load
  if (isLoading && !hasItems && !error) {
    return (
      <ScreenLayout>
        {showHeader && <AppHeader title="التكاليف" />}
        <YStack flex={1} padding={'$2'} marginTop="$3">
          {renderLoadingState()}
        </YStack>
      </ScreenLayout>
    );
  }

  // Show error state if there's an error and no data
  if (error && !hasItems) {
    return (
      <ScreenLayout>
        {showHeader && <AppHeader title="التكاليف" />}
        <YStack flex={1} padding={'$2'} marginTop="$3">
          {renderErrorState()}
        </YStack>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      {showHeader && <AppHeader title="التكاليف" />}
      <YStack flex={1} padding={'$2'} marginTop="$3">
        <FlatList<GroupedCompanyItems>
          data={groupedCompanyItems}
          style={{ flex: 1 }}
          contentContainerStyle={!hasItems ? { flex: 1 } : undefined}
          ListHeaderComponent={() => hasItems ? renderCoastTotal({ showButton: true }) : null}
          showsVerticalScrollIndicator={false}
          renderItem={renderGroupedItem}
          keyExtractor={getKeyExtractor}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
            />
          }
          ItemSeparatorComponent={() => <View height="$3" />}
        />
      </YStack>
    </ScreenLayout>
  );
};

export default CoastListScreen;
