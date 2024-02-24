import { useNumberFieldInfo, useTsController } from '@ts-react/form';
import { Shake } from '@zix/ui/common';
import {
  Fieldset,
  InputProps,
  Label,
  Text,
  Theme,
  XStack,
  useStyle,
  useTheme,
  useThemeName,
} from 'tamagui';
import { useId, useMemo, useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { FieldError } from '../../common';

const CELL_COUNT = 6;
const CELL_WIDTH = 40;
const CELL_HEIGHT = 54;

export const CodeInputField = (
  propsCode: Pick<InputProps, 'size' | 'autoFocus'>
) => {
  const { field, error } = useTsController<number>();
  const { label, defaultValue, minValue, maxValue } = useNumberFieldInfo();
  const themeName = useThemeName();
  const theme = useTheme();

  const cellStyle = useMemo(
    () => ({
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
      alignItems: 'center',
      lineHeight: CELL_HEIGHT * 0.6,
      fontSize: (CELL_WIDTH + CELL_HEIGHT) * 0.25,
      borderWidth: 1,
      borderColor: error?.errorMessage ? 'red' : theme.borderColor.get(),
      borderRadius: 12,
      textAlign: 'center',
      padding: (CELL_WIDTH + CELL_HEIGHT) * 0.1,
    }),
    [error?.errorMessage]
  );

  const rootStyle = useStyle({
    width: CELL_COUNT * (CELL_WIDTH + CELL_WIDTH * 0.4),
  });
  const focusStyle = useStyle({
    borderColor: '$borderColorFocus',
  });
  const id = useId();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
            <CodeField
              ref={ref}
              {...props}
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
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[cellStyle, isFocused && focusStyle]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
              rootStyle={rootStyle}
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
