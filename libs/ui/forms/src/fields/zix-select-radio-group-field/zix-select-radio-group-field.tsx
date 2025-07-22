import React from 'react';
import { Label, RadioGroup, ScrollView, SelectProps, XStack } from 'tamagui';
import { BaseSelectFieldItem } from '../zix-select-field/zix-select-field';

export type ZixSelectRadioGroupnFieldProps = SelectProps & {
  options: BaseSelectFieldItem[];
  onChange?: (value: string) => void;
  value?: string;
  width?: number | string;
  colorSelected?: string;
  colorIndicator?: string;
};

export const ZixSelectRadioGroupnField: React.FC<
ZixSelectRadioGroupnFieldProps
> = ({ options = [], onChange, value, width, colorSelected, colorIndicator, ...props }) => {
  return (
    <RadioGroup
      value={value?.toString() || ''}
      onValueChange={(value) => onChange?.(value)}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      {options && options.length > 2 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          {options.map((item, i) => (
            <XStack gap="$2" width={width} paddingLeft='$3' alignItems="center" key={item.id} backgroundColor={value === item.id ? colorSelected ?? 'red' : 'transparent'}>
              <RadioGroup.Item value={item.id} id={item.id} size={props.size}>
                <RadioGroup.Indicator backgroundColor={value === item.id ? colorIndicator ?? '' : 'transparent'} />
              </RadioGroup.Item>
              <Label size={props.size} htmlFor={item.id}>
                {item.name}
              </Label>
            </XStack>
          ))}
        </ScrollView>
      ) : (
        <XStack gap="$2" paddingLeft='$3' alignItems="center">
          {options.map((item, i) => (
            <XStack alignItems="center" gap="$2" width={width} key={item.id} backgroundColor={value === item.id ? colorSelected ?? 'red' : 'transparent'}>
              <RadioGroup.Item value={item.id} id={item.id} size={props.size}>
                <RadioGroup.Indicator backgroundColor={value === item.id ? colorIndicator ?? '' : 'transparent'} />
              </RadioGroup.Item>
              <Label size={props.size} htmlFor={item.id}>
                {item.name}
              </Label>
            </XStack>
          ))}
        </XStack>
      )}
    </RadioGroup>
  );
};

export default ZixSelectRadioGroupnField;
