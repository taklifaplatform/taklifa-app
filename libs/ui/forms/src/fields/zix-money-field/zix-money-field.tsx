import { Stack, Theme, XStack, useThemeName } from 'tamagui';

import { PriceTransformer } from '@zix/api';
import ZixAutoCompleteField from '../zix-auto-complete-field/zix-auto-complete-field';
import ZixInput from '../zix-input/zix-input';


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

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <XStack flex={1} width="100%" gap="$2">
        <Stack width="30%">
          <ZixAutoCompleteField
            value={value.currency_id}
            onChange={(currency_id) => onValueChange({ ...value, currency_id })}
            dataMapper={(item) => ({
              id: item.id,
              name: `${item.code} - ${item.name}`,
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
          onChangeText={(amount) => onValueChange({ ...value, value: amount })}
          keyboardType="decimal-pad"
          inputMode="numeric"
        />
      </XStack>
    </Theme>
  );
};

export default ZixMoneyField;
