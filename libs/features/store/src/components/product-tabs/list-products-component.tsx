import { ChevronUp, LayoutGrid, LayoutList } from '@tamagui/lucide-icons';
import { BatchProductTransformer, ProductsService } from '@zix/api';
import { DebugObject, SearchProduct, ZixButton, ZixDialog } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { View, H4, Text, XStack, YStack } from 'tamagui';
import { ProductCard } from './product-card';
import { useToastController } from '@tamagui/toast';
import { useAuth } from '@zix/services/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const ListProductsComponent = ({
  batchProduct,
}: {
  batchProduct: BatchProductTransformer;
}) => {
  const [mode, setMode] = useState<'list' | 'grid'>('list');
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [deletedProducts, setDeletedProducts] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const toast = useToastController();
  const { user } = useAuth();
  const products = useMemo(() => {
    return (
      batchProduct.products?.filter(
        (product) => !deletedProducts.includes(product.id ?? ''),
      ) || []
    );
  }, [batchProduct.products, deletedProducts]);
  const handleDelete = (id: string) => {
    setDeletedProducts([...deletedProducts, id]);
  };

  const { mutateAsync } = useMutation({
    mutationFn: (requestBody) => {
      
      return ProductsService.storeProduct({
        requestBody,
      });
    },
    onSuccess() {
      toast.show( 'تم إضافة المنتج بنجاح');
     
      queryClient.invalidateQueries({
        queryKey: ['ProductsService.fetchAllProduct', user?.active_company?.id],
      });
    },
    onError(error: any) {
      toast.show('حدث خطأ ما', {
        message: error.message,
      });
    },
  });
  const renderFilterByType = () => {
    return (
      <ZixDialog
        title={'جميع الفئات'}
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
              جميع الفئات
            </Text>
            <ChevronUp size={20} color="$color0" />
          </XStack>
        }
      ></ZixDialog>
    );
  };

  return (
    <YStack flex={1} gap="$3">
      
      <XStack alignItems="center" gap="$2">
        <ZixButton
          icon={
            mode === 'grid' ? (
              <LayoutGrid size={20} color={'white'} />
            ) : (
              <LayoutList size={20} color={'white'} />
            )
          }
          onPress={() => setMode(mode === 'grid' ? 'list' : 'grid')}
          padding="$2"
          borderRadius="$2"
          backgroundColor={'green'}
          unstyled
        />
        {/* {renderFilterByType()} */}
        {/* <SearchProduct value={search} onChangeText={setSearch} /> */}
      </XStack>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DebugObject object={batchProduct} />
          // <ProductCard
          //   product={item}
          //   mode={mode}
          //   onDelete={() => handleDelete(item.id ?? '')}
          // />
        )}
        keyExtractor={(item) => item.id ?? ''}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 60,
        }}
        ListEmptyComponent={
          <View flex={1} alignItems="center" gap="$2" padding="$4">
            <CustomIcon name="empty_data" size="$18" color="$color5" />
            <H4 color="#8590A2">لم تقم بإضافة أي منتج بعد</H4>
          </View>
        }
      />
      <ZixButton
        theme={'accent'}
        position="absolute"
        bottom={0}
        right={0}
        width={'100%'}
        backgroundColor="$color0"
        icon={<CustomIcon name="add_store" size={20} color="$color10" />}
      >
        <Text fontWeight="500" fontSize={'$3'} color="$color10">
          نشر منتجات في متجري
        </Text>
      </ZixButton>
    </YStack>
  );
};

export default ListProductsComponent;
