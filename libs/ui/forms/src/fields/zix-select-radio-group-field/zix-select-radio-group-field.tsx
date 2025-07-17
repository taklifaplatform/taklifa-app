import React from 'react';
import { Label, RadioGroup, SelectProps, XStack } from 'tamagui';
import { BaseSelectFieldItem } from '../zix-select-field/zix-select-field';

export type ZixSelectRadioGroupnFieldProps = SelectProps & {
  options: BaseSelectFieldItem[];
  onChange?: (value: string) => void;
  value?: string;

};

export const ZixSelectRadioGroupnField: React.FC<
ZixSelectRadioGroupnFieldProps
> = ({ options = [], onChange, value, ...props }) => {
  return (
    <RadioGroup
      value={value?.toString() || ''}
      onValueChange={(value) => onChange?.(value)}
      // width="100%"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      {options &&
        options.map((item, i) => {
          return (
            <XStack gap="$2" width={props.width} paddingLeft='$6' alignItems="center" key={item.id} backgroundColor={value === item.id ? props?.colorSelected ?? 'red' : 'transparent'}>
              <RadioGroup.Item value={item.id} id={item.id} size={props.size}>
                <RadioGroup.Indicator color={value === item.id ? props?.colorIndicator ?? '' : 'transparent'} />
              </RadioGroup.Item>

              <Label size={props.size} htmlFor={item.id}>
                {item.name}
              </Label>
            </XStack>
          );
        })}
    </RadioGroup>
  );
};

export default ZixSelectRadioGroupnField;
