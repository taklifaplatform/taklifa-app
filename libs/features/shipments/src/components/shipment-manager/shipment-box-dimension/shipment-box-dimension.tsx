
import { CustomIcon } from '@zix/ui/icons';
import { Text, XStack, YStack } from 'tamagui';


export function ShipmentBoxDimension() {

  const dimensions = [
    {
      label: 'الطول (سم)',
      value: 25
    },
    {
      label: 'العرض (سم)',
      value: 25
    },
    {
      label: 'الارتفاع (سم)',
      value: 25
    },
    {
      label: 'الوزن (كغ)',
      value: 2.553
    }
  ]

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
          الأبعاد الصندوق ووزنها لاعتيادية
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


export default ShipmentBoxDimension;
