import { XStack, Text, YStack, Theme } from 'tamagui';
import { ZixDialog } from '../zix-dialog/zix-dialog';
import { ChevronUp, CircleCheck, Circle } from '@tamagui/lucide-icons';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { IFilterOption } from '../zix-advanced-filters/zix-advanced-filters';

export interface FilterByOrderProps {
  orderBy: {
    type: string;
    direction: string;
  };
  setOrderBy: (orderBy: {
    type: string;
    direction: string;
  }) => void;
}

const listFilterByOrder = [
  {
    label: 'الأرخص أولا',
    value: {
      type: 'price',
      direction: 'asc',
    },
  },
  {
    label: 'الأغلى أولا',
    value: {
      type: 'price',
      direction: 'desc',
    },
  },
  {
    label: 'الأحدث أولا',
    value: {
      type: 'created_at',
      direction: 'desc',
    },
  },
  {
    label: 'الأقدم أولا',
    value: {
      type: 'created_at',
      direction: 'asc',
    },
  },
];
export const FilterByOrder: React.FC<FilterByOrderProps> = ({ orderBy, setOrderBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const renderFilterItem = (item: IFilterOption, isSelected = false) => (
    <XStack
      onPress={() => {
        setIsOpen(false);
        setOrderBy(item.value as { type: string; direction: string });
      }}
      hoverStyle={{ backgroundColor: '$color5' }}
      pressStyle={{ opacity: 0.5 }}
      backgroundColor="$color1"
      themeShallow
      paddingHorizontal="$4"
      height="$6"
      borderBottomWidth={1}
      borderColor="$color5"
      alignItems="center"
      justifyContent="space-between"
    >
      <XStack gap="$4" alignItems="center" flex={1}>
        {/* {item.icon} */}
        <YStack gap="$2">
          <Text fontWeight="700">{item.label}</Text>
        </YStack>
      </XStack>
      <YStack>
        <Theme name="accent">
          {item.value.type === orderBy.type && item.value.direction === orderBy.direction ? (
            <CircleCheck size={20} color="$color1" />
          ) : (
            <Circle size={20} color="$color0" />
          )}
        </Theme>
      </YStack>
    </XStack>
  );
  return (
    <ZixDialog
      title={'تصفية حسب'}
      open={isOpen}
      onOpenChange={setIsOpen}
      contentPadding="$1"
      snapPoints={[40, 55]}
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
          <Text fontWeight="bold" fontSize={'$3'} color="$color0">
            {listFilterByOrder.find((item) => item.value.type === orderBy.type && item.value.direction === orderBy.direction)?.label}
          </Text>
          <ChevronUp size={20} color="$color0" />
        </XStack>
      }
    >
      <FlatList
        data={listFilterByOrder}
        renderItem={({ item }) => renderFilterItem(item)}
      />
    </ZixDialog>
  );
};

export default FilterByOrder;
