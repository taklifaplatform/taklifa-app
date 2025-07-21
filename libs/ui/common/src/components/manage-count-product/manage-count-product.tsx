import { Minus, Plus } from '@tamagui/lucide-icons';
import { Button, XStack, Text } from 'tamagui';
import { useState, useEffect } from 'react';

export type ManageCountProductProps = {
  value: number;
  onUpdate: (value: number) => void;
  max?: number | null;
  width?: number | string;
  height?: number | string;
  size?: number;
};

export const ManageCountProduct = ({
  value,
  onUpdate,
  width = 100,
  height = 30,
  size = 15,
  max = 100,
}: ManageCountProductProps) => {
  const [count, setCount] = useState(value);

  useEffect(() => {
    onUpdate(count);
  }, [count]);

  const handleUpdateCart = (value: number, state: 'plus' | 'minus') => {
    if (state === 'plus') {
      if (count < (max ?? 100)) {
        setCount(count + 1);
      }
    } else {
      if (count > 0) {
        setCount(count - 1);
      }
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
