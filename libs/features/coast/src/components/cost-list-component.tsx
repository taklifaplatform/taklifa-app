import { SquarePen, Trash2 } from '@tamagui/lucide-icons';
import { ManageCountProduct } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { FlatList } from 'react-native';
import { Image, Text, XStack, YStack } from 'tamagui';
import { useState } from 'react';

export interface CostListComponentProps {
  product: [];
}
export const CostListComponent = ({ product }: CostListComponentProps) => {
  const [count, setCount] = useState(0);
  
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
                <ManageCountProduct value={count} onUpdate={setCount} width={100} height={30} size={10} />
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
