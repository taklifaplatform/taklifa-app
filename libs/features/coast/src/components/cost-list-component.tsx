import { CustomIcon } from '@zix/ui/icons';
import { FlatList } from 'react-native';
import { Image, Text, XStack, YStack, Button } from 'tamagui';
import { Plus, Minus, Trash2, SquarePen } from '@tamagui/lucide-icons';

export interface CostListComponentProps {
  product: [];
}
export const CostListComponent = ({ product }: CostListComponentProps) => {
  const handleUpdateCart = (value: number, state: 'plus' | 'minus') => {
    console.log(value, state);
  };
  return (
    <FlatList
      data={product}
      renderItem={({ item, index }) => (
        <XStack
          flex={1}
          backgroundColor={'$color2'}
          padding={'$3'}
          borderRadius={'$4'}
          marginVertical={'$2'}
          justifyContent="space-between"
          alignItems="center"
        >
          <XStack gap={'$3'} alignItems="center">
            <Image
              source={require('./pic.png')}
              width={60}
              height={70}
              borderRadius={10}
            />
            <YStack gap={'$4'}>
              <Text fontSize={10} fontWeight={'bold'}>
                أعمال اللياسة الخارجية - السعر بالمتر المربع
              </Text>
              <XStack justifyContent="space-between">
                <XStack gap={'$2'} alignItems="center">
                  <Text fontSize={'$3'} fontWeight={'500'}>
                    40
                  </Text>
                  <CustomIcon name="riyal" size={'$1'} color={'black'} />
                </XStack>
                <XStack
                  width={100}
                  justifyContent="space-between"
                  alignItems="center"
                  borderWidth={1}
                  borderColor="$color0"
                  borderRadius={10}
                  padding={'$2'}
                >
                  <Button
                    icon={<Plus size={10} color="$color11" />}
                    unstyled
                    onPress={() => handleUpdateCart(1, 'plus')}
                  />
                  <Text fontSize={'$1'} fontWeight={'bold'} color="$color11">
                    1
                  </Text>
                  <Button
                    icon={<Minus size={10} color="$color11" />}
                    unstyled
                    onPress={() => handleUpdateCart(1, 'minus')}
                  />
                </XStack>
              </XStack>
            </YStack>
          </XStack>
          <XStack gap={'$4'} alignItems="flex-end">
            <SquarePen size={15} color={'black'} />
            <Trash2 size={15} color={'black'} />
          </XStack>
        </XStack>
      )}
    />
  );
};

export default CostListComponent;
