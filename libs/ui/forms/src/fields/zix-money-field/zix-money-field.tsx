import { Stack, Theme, XStack, useThemeName } from 'tamagui';

import { PriceTransformer } from '@zix/api';
import ZixAutoCompleteField from '../zix-auto-complete-field/zix-auto-complete-field';
import ZixInput from '../zix-input/zix-input';
import { useEffect } from 'react';
import { Platform } from 'react-native';


export type ZixMoneyFieldProps = {
  value: PriceTransformer;
  onValueChange: (value: PriceTransformer) => void;
  error?: { errorMessage: string };
};

export const ZixMoneyField: React.FC<ZixMoneyFieldProps> = ({
  onValueChange,
  value,
  error,
}) => {
  const themeName = useThemeName();
  useEffect(() => {
    // Set default value to "1 - Rial Saudi" if no currency is selected
    if (!value.currency_id) {
      onValueChange({ ...value, currency_id: '117' });
    }
  }, [value, onValueChange]);

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <XStack flex={1} width="100%" gap="$2"
        padding={Platform.OS === 'web' ? '$4' : null}
      >
        <Stack width="30%">
          <ZixAutoCompleteField
            value={value.currency_id}
            onChange={(currency_id) => onValueChange({ ...value, currency_id })}
            defaultValue={'1'}
            dataMapper={(item) => ({
              id: item.id,
              name: `${item.units?.major?.name} - ${item.units?.major?.symbol || item.code}`,
            })}
            api="geography/currencies"
            selectTriggerProps={{
              padding: '$2.5',
              gap: '$0',
              scaleIcon: 0.5,
            }}
          />
        </Stack>
        <ZixInput
          flex={1}
          containerProps={{ flex: 1 }}
          value={value.value}
          onChangeText={(amount) => onValueChange({ ...value, value: amount || 0 })}
          keyboardType="decimal-pad"
          inputMode="numeric"
        />
      </XStack>
    </Theme>
  );
};

export default ZixMoneyField;
