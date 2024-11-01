import { useStringFieldInfo, useTsController } from '@ts-react/form';
import { useMemo } from 'react';
import { Text } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  XStack,
  useStyle,
  useTheme
} from 'tamagui';
import { FormFieldContainer } from '../../common';
import { CodeInputFieldProps } from './code-input-field';

const CELL_COUNT = 6;
const CELL_WIDTH = 40;
const CELL_HEIGHT = 54;

export const CodeInputField: React.FC<CodeInputFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const { field, error } = useTsController<string>();
  const theme = useTheme();

  const textStyle = useStyle({
    color: '$color11'
  })

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
      // theme: theme,
      // color: theme.colors..get(),
    }),
    [error?.errorMessage, theme.borderColor]
  );

  const rootStyle = useStyle({
    width: CELL_COUNT * (CELL_WIDTH + CELL_WIDTH * 0.4),
  });
  const focusStyle = useStyle({
    borderColor: '$borderColorFocus',
  });

  const ref = useBlurOnFulfill({ value: field.value, cellCount: CELL_COUNT });
  const [propsCode, getCellOnLayoutHandler] = useClearByFocusCell({
    value: field.value,
    setValue: (value) => field.onChange(value),
  });

  return (
    <FormFieldContainer {...containerProps} fieldInfo={useStringFieldInfo}>
      <XStack justifyContent='space-around'>
        <CodeField
          ref={ref}
          {...propsCode}
          value={field.value}
          onChangeText={field.onChange}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[textStyle, cellStyle as any, isFocused && focusStyle]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
          rootStyle={rootStyle}
        />
      </XStack>
    </FormFieldContainer>
  )
};

export default CodeInputField;
