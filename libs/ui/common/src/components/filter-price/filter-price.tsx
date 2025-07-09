import { useState } from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { ZixDialog } from '../zix-dialog/zix-dialog';
import { ZixSlider } from '../zix-slider/zix-slider';
import { CustomIcon } from '@zix/ui/icons';
import { Filter } from '@tamagui/lucide-icons';

export const FilterPrice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  return (
    <ZixDialog
      title={'الفلتر'}
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
            الفلتر
          </Text>
          <Filter size={20} color="$color0" />
        </XStack>
      }
    >
      <XStack flex={1} gap="$4" padding="$4">
        <YStack gap="$4" alignItems="center" justifyContent="center">
          <Text>السعر</Text>
          <XStack width="100%" justifyContent="center" gap="$4">
            <XStack>
              <Text fontWeight="600" fontSize={'$3'}>
                {priceRange[1] * 6000}
              </Text>
              <CustomIcon name="riyal" size="$1" />
            </XStack>
            <Text fontWeight="600" fontSize={'$3'}>
              {' '}
              -{' '}
            </Text>

            <XStack>
              <Text fontWeight="600" fontSize={'$3'}>
                {priceRange[0] * 100}
              </Text>
              <CustomIcon name="riyal" size="$1" />
            </XStack>
          </XStack>
          <ZixSlider
            min={0}
            max={10}
            step={1}
            values={priceRange}
            onValuesChange={(values) => setPriceRange(values)}
          />
        </YStack>
      </XStack>
    </ZixDialog>
  );
};

export default FilterPrice;
