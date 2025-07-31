import { Save, Trash2 } from '@tamagui/lucide-icons';
import { CartItemTransformer } from '@zix/api';
import { useCart } from '@zix/services/auth';
import {
  FullScreenSpinner,
  ManageCountProduct,
  ZixButton,
} from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Image, Separator, Text, Theme, XStack, YStack } from 'tamagui';

export interface CartItemComponentProps {
  item: CartItemTransformer;
  onRemove?: (item: CartItemTransformer) => void;
}

export const CartItemComponent = ({
  item,
  onRemove,
}: CartItemComponentProps) => {
  const { updateItemQuantity, formatCurrency } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [newQuantity, setNewQuantity] = useState<number | null>(null);

  // Use the actual cart quantity as default
  const currentQuantity = item.quantity || 1;

  const handleQuantityUpdate = useCallback(
    async (newQuantity: number) => {
      if (newQuantity === currentQuantity || isUpdating) return;

      try {
        setIsUpdating(true);

        await updateItemQuantity(item, newQuantity);
      } catch (error) {
        console.error('Failed to update quantity:', error);
      } finally {
        setIsUpdating(false);
      }
    },
    [currentQuantity, isUpdating, item, updateItemQuantity],
  );

  const formattedPrice = useMemo(() => {
    return formatCurrency(Number(item.total_price || 0));
  }, [item.total_price]);

  const unitPrice = useMemo(() => {
    return formatCurrency(Number(item.unit_price || 0));
  }, [item.unit_price]);

  return (
    <YStack
      flex={1}
      backgroundColor={'$color2'}
      padding={'$3'}
      borderRadius={'$4'}
      marginVertical={'$2'}
      alignItems="center"
      // opacity={isUpdating ? 0.6 : 1}
    >
      <XStack gap={'$3'} alignItems="center" flex={1} paddingVertical={'$3'}>
        {item.product?.image?.original_url ? (
          <Image
            source={{ uri: item.product?.image?.original_url }}
            width={60}
            height={70}
            borderRadius={10}
          />
        ) : (
          <CustomIcon name="image-blank" size={'$7'} color={'$color8'} />
        )}
        <YStack gap={'$2'} flex={1} alignItems="flex-start">
          <XStack
            width={'100%'}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize={'$3'} fontWeight={'bold'} numberOfLines={2}>
              {item.product?.name || 'اسم المنتج غير متوفر'}
            </Text>
            <TouchableOpacity
              style={{ paddingLeft: 10 }}
              onPress={() => {
                handleQuantityUpdate(0);
              }}
            >
              <Trash2
                size={18}
                color={'$red9'}
                style={{ opacity: isUpdating ? 0.5 : 1 }}
              />
            </TouchableOpacity>
          </XStack>

          {/* Unit price display */}
          <XStack gap={'$2'} alignItems="center">
            <Text fontSize={'$2'} color="$color8">
              سعر الوحدة:
            </Text>
            <Text fontSize={'$2'} fontWeight={'500'} color="$color10">
              {unitPrice}
            </Text>
            <CustomIcon name="riyal" size={'$1'} color={'$color8'} />
          </XStack>
        </YStack>
      </XStack>
      <Separator
        marginVertical={'$2'}
        backgroundColor={'$color6'}
        width={'100%'}
      />
      <XStack
        width={'100%'}
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={'$3'}
      >
        <ManageCountProduct
          value={currentQuantity}
          onUpdate={handleQuantityUpdate}
          onChangeValue={(value) => {
            setNewQuantity(value);
          }}
          width={130}
          height={35}
          size={15}
          min={1}
          max={99}
          disabled={isUpdating}
        />
        {newQuantity && (
          <Theme name="accent">
            <ZixButton
              size={'$3'}
              icon={<Save size={22} color={'$color2'} />}
              onPress={() => {
                handleQuantityUpdate(newQuantity);
                setNewQuantity(null);
              }}
            />
          </Theme>
        )}
        {isUpdating && (
          <Theme name="accent">
            <FullScreenSpinner size="large" color={'$color1'} />
          </Theme>
        )}
        <XStack gap={'$2'} alignItems="center">
          <Text fontSize={'$4'} fontWeight={'bold'} color="$color12">
            {formattedPrice}
          </Text>
          <CustomIcon name="riyal" size={'$2'} color={'$color12'} />
        </XStack>
      </XStack>
    </YStack>
  );
};

export interface CostListComponentProps {
  items: CartItemTransformer[];
  onItemEdit?: (item: CartItemTransformer) => void;
  onItemRemove?: (item: CartItemTransformer) => void;
}

export const CostListComponent = ({
  items,
  onItemEdit,
  onItemRemove,
}: CostListComponentProps) => {
  const getItemKey = useCallback(
    (item: CartItemTransformer) =>
      item.id || `${item.product_id}-${item.variant_id}`,
    [],
  );

  const renderCartItem = useCallback(
    ({ item }: { item: CartItemTransformer }) => (
      <CartItemComponent
        item={item}
        onEdit={onItemEdit}
        onRemove={onItemRemove}
      />
    ),
    [onItemEdit, onItemRemove],
  );

  if (!items || items.length === 0) {
    return (
      <YStack alignItems="center" padding={'$4'}>
        <Text fontSize={'$3'} color="$color8">
          لا توجد عناصر في هذه المجموعة
        </Text>
      </YStack>
    );
  }

  return (
    <FlatList
      data={items}
      renderItem={renderCartItem}
      keyExtractor={getItemKey}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CostListComponent;
