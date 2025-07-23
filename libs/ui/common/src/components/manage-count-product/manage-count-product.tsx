import { Minus, Plus } from '@tamagui/lucide-icons';
import { Button, XStack, Text } from 'tamagui';
import { useState, useEffect, useCallback } from 'react';

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
  height = 30,
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
      borderWidth={1}
      borderColor={disabled ? "$color6" : "$color0"}
      borderRadius={10}
      opacity={disabled ? 0.6 : 1}
    >
      <Button
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
      />
      
      <Text 
        fontSize={'$2'} 
        fontWeight={'bold'} 
        color={disabled ? "$color8" : "$color11"}
        minWidth={20}
        textAlign="center"
      >
        {internalValue}
      </Text>
      
      <Button
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
      />
    </XStack>
  );
};
