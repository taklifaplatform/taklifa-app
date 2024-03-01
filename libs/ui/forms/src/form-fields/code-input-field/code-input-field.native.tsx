import { useNumberFieldInfo, useTsController } from '@ts-react/form';
import { useMemo } from 'react';
import { Text } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  InputProps,
  XStack,
  useStyle,
  useTheme
} from 'tamagui';
import ZixFieldContainer from '../../common/zix-field-container/zix-field-container';

const CELL_COUNT = 6;
const CELL_WIDTH = 40;
const CELL_HEIGHT = 54;

export const CodeInputField = (
  propsCode: Pick<InputProps, 'size' | 'autoFocus'>
) => {
  const { field, error } = useTsController<number>();
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
    [error?.errorMessage, theme.borderColor]
  );

  const rootStyle = useStyle({
    width: CELL_COUNT * (CELL_WIDTH + CELL_WIDTH * 0.4),
  });
  const focusStyle = useStyle({
    borderColor: '$borderColorFocus',
  });

  const ref = useBlurOnFulfill({ value: String(field.value), cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: String(field.value),
    setValue: (value) => field.onChange(Number(value)),
  });

  return (
    <ZixFieldContainer fieldInfo={useNumberFieldInfo}>
      <XStack justifyContent='space-around'>
        <CodeField
          ref={ref}
          {...props}
          value={String(field.value)}
          onChangeText={(text) => field.onChange(Number(text))}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[cellStyle as any, isFocused && focusStyle]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
          rootStyle={rootStyle}
          {...propsCode}
        />
      </XStack>
    </ZixFieldContainer>
  )
};

export default CodeInputField;
