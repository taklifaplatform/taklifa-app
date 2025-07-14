import { Minus, Plus } from '@tamagui/lucide-icons';
import { Button, XStack, Text } from 'tamagui';

export type ManageCountProductProps = {
  value: number;
  onUpdate: (value: number) => void;
  width?: number | string;
  height?: number | string;
  size?: number;
};

export const ManageCountProduct = ({
  value,
  onUpdate,
  width = 100,
  height = 30,
  size = 10,
}: ManageCountProductProps) => {
  const handleUpdateCart = (value: number, state: 'plus' | 'minus') => {
    if (state === 'plus') {
      onUpdate(value + 1);
    } else {
      onUpdate(value - 1);
    }
  };
  return (
    <XStack
      width={width}
      height={height}
      justifyContent="space-between"
      alignItems="center"
      borderWidth={1}
      borderColor="$color0"
      borderRadius={10}
      padding={'$2'}
    >
      <Button
        icon={<Plus size={size} color="$color11" />}
        unstyled
        onPress={() => handleUpdateCart(1, 'plus')}
      />
      <Text fontSize={'$1'} fontWeight={'bold'} color="$color11">
        {value}
      </Text>
      <Button
        icon={<Minus size={size} color="$color11" />}
        unstyled
        onPress={() => handleUpdateCart(1, 'minus')}
      />
    </XStack>
  );
};
