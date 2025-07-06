import {
  BadgeCheck,
  ShoppingBag,
  SquarePen,
  Trash2,
} from '@tamagui/lucide-icons';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { Text, XStack, YStack } from 'tamagui';

export interface CostHeaderProps {
  title: string;
  price: string;
}
export const CostHeader = ({ title, price }: CostHeaderProps) => {
  return (
    <XStack alignItems="center" justifyContent="space-between">
      <XStack gap={'$3'} alignItems="flex-start">
        <UserAvatar user={{}} size={'$3'} />
        <YStack gap={'$2'}>
          <XStack gap={'$2'}>
            <Text fontWeight={'bold'}>{title}</Text>
            <BadgeCheck size={20} color={'green'} />
          </XStack>
          <XStack gap={'$3'} alignItems="center">
            <ShoppingBag size={16} color={'black'} />
            <Text fontSize={'$3'} fontWeight={'bold'}>
              {price}
            </Text>
            <CustomIcon name="riyal" size={'$1'} color={'black'} />
          </XStack>
        </YStack>
      </XStack>
      <XStack gap={'$4'} alignItems="flex-end">
        <SquarePen size={18} color={'black'} />
        <Trash2 size={18} color={'black'} />
      </XStack>
    </XStack>
  );
};

export default CostHeader;
