import { Check } from '@tamagui/lucide-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Label,
  SelectProps,
  View,
  XStack
} from 'tamagui';

export interface RadioOption {
  id: number;
  name: string;
}

export type ZixSelectRadioGroupFieldProps = Omit<
  SelectProps,
  'value' | 'onValueChange'
> & {
  options: RadioOption[];
  onChange?: (value: number) => void;
  value?: number;
  width?: number | string;
  colorSelected?: string;
  colorIndicator?: string;
  disabled?: boolean;
  'aria-label'?: string;
  hasError?: boolean;
};

export const ZixSelectRadioGroupField: React.FC<ZixSelectRadioGroupFieldProps> =
  React.memo(
    ({
      options = [],
      onChange,
      value,
      width,
      colorSelected = '$blue8',
      colorIndicator = '$blue10',
      disabled = false,
      'aria-label': ariaLabel,
      hasError = false,
      ...props
    }) => {
      const handleValueChange = (newValue: string | number) => {
        if (!disabled && onChange) {
          onChange(Number(newValue));
        }
      };

      const renderRadioItem = (item: RadioOption, index: number) => {
        const isSelected = value === item.id;
        const itemId = `radio-${item.id}`;

        return (
          <TouchableOpacity onPress={() => handleValueChange(item.id)}>
            <XStack
              key={item.id}
              gap="$2"
              paddingLeft={index === 0 ? '$3' : '$2'}
              alignItems="center"
              backgroundColor={isSelected ? colorSelected : 'transparent'}
              borderRadius="$2"
              padding="$2"
              opacity={disabled ? 0.5 : 1}
              pointerEvents={disabled ? 'none' : 'auto'}
            >
              <View
                width={16}
                height={16}
                borderColor={isSelected ? colorIndicator : '$color11'}
                borderWidth={1}
                borderRadius={16}
                alignItems="center"
                justifyContent="center"
              >
                {isSelected && <Check size={16} color={colorIndicator} />}
              </View>
              <Label
                size={props.size}
                htmlFor={itemId}
                color={isSelected ? '$color9' : '$color12'}
                fontWeight={isSelected ? '600' : '400'}
              >
                {item.name}
              </Label>
            </XStack>
          </TouchableOpacity>
        );
      };

      if (options.length === 0) {
        return null;
      }

      return (
        <XStack gap="$2">
          {options.map((item, index) => renderRadioItem(item, index))}
        </XStack>
      );
    },
  );

ZixSelectRadioGroupField.displayName = 'ZixSelectRadioGroupField';

export default ZixSelectRadioGroupField;
