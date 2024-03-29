
import { ShipmentItemTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
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
      label: 'الطول (سم)',
      value: item.dim_length || 25
    },
    {
      label: 'العرض (سم)',
      value: item.dim_width || 25
    },
    {
      label: 'الارتفاع (سم)',
      value: item.dim_height || 25
    },
    {
      label: 'الوزن (كغ)',
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
            !item?.dim_length ? 'الأبعاد الصندوق ووزنها لاعتيادية' : 'الأبعاد الصندوق ووزنها'
          }
        </Text>
        <XStack gap='$3' flex={1}>
          {
            dimensions.map(({ label, value }, index) => (
              <YStack
                flex={1}
                borderWidth='1'
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
