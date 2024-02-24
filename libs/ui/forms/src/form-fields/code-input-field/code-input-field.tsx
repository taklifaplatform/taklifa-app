import { useNumberFieldInfo, useTsController } from '@ts-react/form';
import { Shake } from '@zix/ui/common';
import {
  Fieldset,
  Input,
  InputProps,
  Label,
  Theme,
  XStack,
  useThemeName,
} from 'tamagui';
import { useId, useState } from 'react';
import { FieldError } from '../../common';

export const CodeInputField = (
  propsCode: Pick<InputProps, 'size' | 'autoFocus'>
) => {
  const { field, error } = useTsController<number>();
  const { label, defaultValue, minValue, maxValue } = useNumberFieldInfo();
  const themeName = useThemeName();

  const id = useId();
  const [value, setValue] = useState('');

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <Fieldset>
        {!!label && (
          <Label textAlign="center" size={propsCode.size || '$3'} htmlFor={id}>
            {label}
          </Label>
        )}
        <XStack justifyContent="space-around">
          <Shake shakeKey={error?.errorMessage}>
            <Input
              value={value}
              onChangeText={(text) => {
                const num = Number(text);
                if (isNaN(num)) {
                  if (!field.value) {
                    field.onChange(defaultValue || 0);
                  }
                  return;
                }
                if (typeof maxValue !== 'undefined' && num > maxValue) {
                  field.onChange(minValue);
                  return;
                }
                if (typeof minValue !== 'undefined' && num < minValue) {
                  field.onChange(minValue);
                  return;
                }
                field.onChange(num);
                setValue(text);
              }}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              {...propsCode}
            />
          </Shake>
        </XStack>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  );
};

export default CodeInputField;
