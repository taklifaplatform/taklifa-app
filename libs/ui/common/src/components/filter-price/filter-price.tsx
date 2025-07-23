import { useState } from 'react';
import { XStack, YStack, Text, Theme } from 'tamagui';
import { ZixDialog } from '../zix-dialog/zix-dialog';
import { ZixSlider } from '../zix-slider/zix-slider';
import { CustomIcon } from '@zix/ui/icons';
import { Filter } from '@tamagui/lucide-icons';

type FilterPriceProps = {
  priceRange: {
    min: number;
    max: number;
  };
  setPriceRange: (priceRange: { min: number; max: number }) => void;
};

export const FilterPrice: React.FC<FilterPriceProps> = ({ priceRange, setPriceRange }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Text fontWeight="bold" fontSize={'$3'} color="$color0">
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
                {priceRange.max}
              </Text>
              <Theme name="accent">
                <CustomIcon name="riyal" size="$1" color="$color0"/>
              </Theme>
            </XStack>
            <Text fontWeight="600" fontSize={'$3'}>
              {' '}
              -{' '}
            </Text>

            <XStack>
              <Text fontWeight="600" fontSize={'$3'}>
                {priceRange.min}
              </Text>
              <CustomIcon name="riyal" size="$1" />
            </XStack>
          </XStack>
          <ZixSlider
            min={0}
            max={10}
            step={1}
            values={[priceRange.min / 100, priceRange.max / 6000]}
            onValuesChange={(values) => setPriceRange({ min: values[0] * 100, max: values[1] * 6000 })}
          />
        </YStack>
      </XStack>
    </ZixDialog>
  );
};

export default FilterPrice;
