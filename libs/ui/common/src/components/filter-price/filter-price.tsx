import { useState } from 'react';
import { XStack, YStack, Text, Theme } from 'tamagui';
import { ZixDialog } from '../zix-dialog/zix-dialog';
import { ZixSlider } from '../zix-slider/zix-slider';
import { CustomIcon } from '@zix/ui/icons';
import { Filter } from '@tamagui/lucide-icons';
import { ZixInput } from '@zix/ui/forms';

type FilterPriceProps = {
  priceRange: {
    min: number | undefined;
    max: number | undefined;
  };
  setPriceRange: (priceRange: { min: number | undefined; max: number | undefined }) => void;
};

export const FilterPrice: React.FC<FilterPriceProps> = ({ priceRange, setPriceRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [snapPoints, setSnapPoints] = useState([35, 50]);

  const handleSnapPoints = (points: number[]) => {
    setSnapPoints(points);
  };

  return (
    <ZixDialog
      title={'الفلتر'}
      open={isOpen}
      onOpenChange={setIsOpen}
      contentPadding="$1"
      snapPoints={snapPoints}
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
          <Text fontWeight="bold" fontSize={'$3'} color="$color12">
            الفلتر
          </Text>
          <Filter size={20} color="$color12" />
        </XStack>
      }
    >
        <YStack flex={1} gap="$2" alignItems="center" justifyContent="flex-start" padding="$4">
          <Text color="$color12">السعر</Text>
          <XStack  gap="$4" justifyContent="center" alignItems="center" padding="$1" >
            <Text fontWeight="600" fontSize={'$3'} color="$color12">
              أقل سعر
            </Text>
            <ZixInput
              containerProps={{
                width: '50%',
              }}
              leftIcon={() => <CustomIcon name="riyal" size="$1" color="$color12" />}
              keyboardType='numeric'
              placeholder="أقل سعر"
              value={priceRange.min?.toString()}
              onChangeText={(text) => setPriceRange({ ...priceRange, min: Number(text) })}
              onFocus={() => handleSnapPoints([65, 70])}
              onBlur={() => handleSnapPoints([35, 50])}
            />
          </XStack>
          <XStack  gap="$4" alignItems="center" justifyContent="flex-start" >
            <Text fontWeight="600" fontSize={'$3'} color="$color12">
              أعلى سعر
            </Text>
              <ZixInput
                containerProps={{
                  width: '50%',
                }}
              leftIcon={() => <CustomIcon name="riyal" size="$1" color="$color12" />}
              keyboardType='numeric'
              placeholder="أعلى سعر"
              value={priceRange.max?.toString()}
              onChangeText={(text) => setPriceRange({ ...priceRange, max: Number(text) })}
              onFocus={() => handleSnapPoints([65, 70])}
              onBlur={() => handleSnapPoints([35, 50])}
            />
          </XStack>
        </YStack>
    </ZixDialog>
  );
};

export default FilterPrice;
