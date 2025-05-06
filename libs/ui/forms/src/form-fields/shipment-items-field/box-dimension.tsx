
import { ShipmentItemTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useMemo } from 'react';
import { Text, XStack, YStack } from 'tamagui';

export type BoxDimensionProps = {
  item: ShipmentItemTransformer
};

export const BoxDimension: React.FC<BoxDimensionProps> = ({
  item
}) => {

  const dimensions = useMemo(() => ([
    {
      label: (t('common:length-ship')),
      value: item.dim_length || 25
    },
    {
      label: (t('common:width-ship')),
      value: item.dim_width || 25
    },
    {
      label: (t('common:height-ship')),
      value: item.dim_height || 25
    },
    {
      label: (t('common:approx-ship')),
      value: item.cap_weight || 1
    }
  ]), [item])

  return (
    <XStack
      alignItems='center'
      backgroundColor='$color2'
      padding='$4'
      borderRadius='$4'
      gap='$3'
    >
      <CustomIcon name='dimension_box' size='$4' />
      <YStack gap='$3' flex={1}>
        <Text>
          {
            !item?.dim_length ? (t('common:box-dimensions-and-weigth-are-normal')) : (t('common:box-dimensions-and-weigth'))
          }
        </Text>
        <XStack gap='$3' flex={1}>
          {
            dimensions.map(({ label, value }, index) => (
              <YStack
                flex={1}
                borderWidth='$1'
                paddingVertical='$2'
                paddingHorizontal='$1'
                borderRadius='$2'
                alignItems='center'
                gap='$2'
                key={index}
              >
                <Text fontSize={10}>
                  {label}
                </Text>
                <Text>{value}</Text>
              </YStack>
            ))
          }
        </XStack>
      </YStack>
    </XStack>
  );
}


export default BoxDimension;
