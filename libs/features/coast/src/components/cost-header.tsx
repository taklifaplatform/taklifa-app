import {
  BadgeCheck,
  ShoppingBag,
  SquarePen,
  Trash2,
} from '@tamagui/lucide-icons';
import { CartItemTransformer } from '@zix/api';
import { useCart } from '@zix/services/auth';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useCallback, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, Theme, XStack, YStack } from 'tamagui';

export interface CostHeaderProps {
  title: string;
  price: string;
  logo: string;
  items: CartItemTransformer[];
}
export const CostHeader = ({ title, price, logo, items }: CostHeaderProps) => {
  const { updateItemQuantity } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsUpdating(true);
    try {
      await Promise.all(items.map((item) => updateItemQuantity(item, 0)));
    } catch (error) {
      console.error('Failed to delete items:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [items, updateItemQuantity]);

  return (
    <Theme name="accent">
      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack gap={'$3'} alignItems="flex-start">
          <UserAvatar user={{ logo: logo }} size={'$3'} />
          <YStack gap={'$2'}>
            <XStack gap={'$2'}>
              <Text fontWeight={'bold'} fontSize={'$4'} color="$color1">
                {title}
              </Text>
              <BadgeCheck size={20} color="$color1" />
            </XStack>
            <XStack gap={'$3'} alignItems="center">
              <ShoppingBag size={16} color="$color12" />
              <Text fontSize={'$3'} fontWeight={'bold'} color="$color12">
                {price}
              </Text>
              <CustomIcon name="riyal" size={'$1'} color="$color12" />
            </XStack>
          </YStack>
        </XStack>
        <XStack gap={'$4'} alignItems="flex-end">
          <TouchableOpacity
            style={{ paddingLeft: 10 }}
            onPress={() => {
              setIsUpdating(true);
              handleDelete();
            }}
          >
            {isUpdating ? (
              <ActivityIndicator size="small" color={'$red9'} />
            ) : (
              <Trash2 size={18} color={'$red9'} />
            )}
          </TouchableOpacity>
        </XStack>
      </XStack>
    </Theme>
  );
};

export default CostHeader;
