import { SquarePen, Trash2 } from '@tamagui/lucide-icons';
import { CartItemTransformer } from '@zix/api';
import { useCart } from '@zix/services/auth';
import { ManageCountProduct } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { Image, Text, XStack, YStack } from 'tamagui';

export interface CartItemComponentProps {
  item: CartItemTransformer;
  onEdit?: (item: CartItemTransformer) => void;
  onRemove?: (item: CartItemTransformer) => void;
}

export const CartItemComponent = ({
  item,
  onEdit,
  onRemove,
}: CartItemComponentProps) => {
  const { updateItemQuantity, removeItem, formatCurrency } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  // Use the actual cart quantity as default
  const currentQuantity = item.quantity || 1;

  const handleQuantityUpdate = useCallback(async (newQuantity: number) => {
    if (newQuantity === currentQuantity || isUpdating) return;

    try {
      setIsUpdating(true);

      await updateItemQuantity(item, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [currentQuantity, isUpdating, item, updateItemQuantity]);

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit(item);
    } else {
      // Default edit behavior - could open a modal or navigate to edit screen
      console.log('Edit item:', item);
    }
  }, [onEdit, item]);

  const handleRemove = useCallback(async () => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);

      if (onRemove) {
        onRemove(item);
      } else if (item.id) {
        await removeItem(item.id);
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [isUpdating, onRemove, item, removeItem]);

  const formattedPrice = useMemo(() => {
    return formatCurrency(Number(item.total_price || 0));
  }, [item.total_price]);

  const unitPrice = useMemo(() => {
    return formatCurrency(Number(item.unit_price || 0));
  }, [item.unit_price]);

  return (
    <XStack
      flex={1}
      backgroundColor={'$color2'}
      padding={'$3'}
      borderRadius={'$4'}
      marginVertical={'$2'}
      justifyContent="space-between"
      alignItems="center"
      opacity={isUpdating ? 0.6 : 1}
    >
      <XStack gap={'$3'} alignItems="center" flex={1}>
        <Image
          source={require('./pic.png')}
          width={60}
          height={70}
          borderRadius={10}
        />
        <YStack gap={'$2'} flex={1} alignItems="flex-start">
          <Text fontSize={'$3'} fontWeight={'bold'} numberOfLines={2}>
            {item.product?.name || 'اسم المنتج غير متوفر'}
          </Text>

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

          <XStack width={'100%'} justifyContent="space-between" alignItems="center">
            <XStack gap={'$2'} alignItems="center">
              <Text fontSize={'$4'} fontWeight={'bold'} color="$color12">
                {formattedPrice}
              </Text>
              <CustomIcon name="riyal" size={'$2'} color={'$color12'} />
            </XStack>

            <ManageCountProduct
              value={currentQuantity}
              onUpdate={handleQuantityUpdate}
              // width={100}
              // height={30}
              size={15}
              min={1}
              max={99}
              disabled={isUpdating}
            />
          </XStack>
        </YStack>
      </XStack>

      <XStack gap={'$3'} alignItems="center" paddingLeft={'$2'}>
        <SquarePen
          size={18}
          color={'$color10'}
          onPress={handleEdit}
          style={{ opacity: isUpdating ? 0.5 : 1 }}
        />
        <Trash2
          size={18}
          color={'$red9'}
          onPress={handleRemove}
          style={{ opacity: isUpdating ? 0.5 : 1 }}
        />
      </XStack>
    </XStack>
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
  const getItemKey = useCallback((item: CartItemTransformer) =>
    item.id || `${item.product_id}-${item.variant_id}`, []
  );

  const renderCartItem = useCallback(({ item }: { item: CartItemTransformer }) => (
    <CartItemComponent
      item={item}
      onEdit={onItemEdit}
      onRemove={onItemRemove}
    />
  ), [onItemEdit, onItemRemove]);

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
