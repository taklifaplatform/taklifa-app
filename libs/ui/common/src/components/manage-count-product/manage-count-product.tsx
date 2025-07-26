import { Minus, Plus } from '@tamagui/lucide-icons';
import { ZixInput } from '@zix/ui/forms';
import { useCallback, useEffect, useState } from 'react';
import { Button, XStack } from 'tamagui';

export type ManageCountProductProps = {
  value: number;
  onUpdate: (value: number) => void;
  min?: number;
  max?: number;
  width?: number | string;
  height?: number | string;
  size?: number;
  disabled?: boolean;
};

export const ManageCountProduct = ({
  value,
  onUpdate,
  min = 1,
  max = 100,
  width = 100,
  height = 40,
  size = 15,
  disabled = false,
}: ManageCountProductProps) => {
  const [internalValue, setInternalValue] = useState(value);

  // Sync internal value with prop value when it changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleIncrement = useCallback(() => {
    if (disabled) return;
    
    const newValue = Math.min(internalValue + 1, max);
    if (newValue !== internalValue) {
      setInternalValue(newValue);
      onUpdate(newValue);
    }
  }, [internalValue, max, disabled, onUpdate]);

  const handleDecrement = useCallback(() => {
    if (disabled) return;
    
    const newValue = Math.max(internalValue - 1, min);
    if (newValue !== internalValue) {
      setInternalValue(newValue);
      onUpdate(newValue);
    }
  }, [internalValue, min, disabled, onUpdate]);

  const canIncrement = !disabled && internalValue < max;
  const canDecrement = !disabled && internalValue > min;

  return (
    <XStack
      width={width}
      height={height}
      justifyContent="space-between"
      alignItems="center"
      borderColor={disabled ? "$color6" : "$color0"}
      borderRadius={10}
      opacity={disabled ? 0.6 : 1}
    >
      <ZixInput
        value={internalValue.toString()}
        onChangeText={(text) => {
          const num = Number(text);
          if (!isNaN(num)) {
            setInternalValue(num);
          }
        }}
        rightIcon={() =><Button
          icon={
            <Minus 
              size={size} 
              color={canDecrement ? "$color11" : "$color8"} 
            />
          }
          unstyled
          size={size}
          onPress={handleDecrement}
          disabled={!canDecrement}
          opacity={canDecrement ? 1 : 0.5}
        />}
        leftIcon={() => <Button
          icon={
            <Plus 
              size={size} 
              color={canIncrement ? "$color11" : "$color8"} 
            />
          }
          unstyled
          size={size}
          onPress={handleIncrement}
          disabled={!canIncrement}
          opacity={canIncrement ? 1 : 0.5}
        />}
        keyboardType="numeric"
        width={width}
        height={height}
        textAlign="center"
        backgroundColor="$color2"
      />
      
    </XStack>
  );
};
