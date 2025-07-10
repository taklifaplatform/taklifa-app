import { Stack, Theme, XStack, useThemeName } from 'tamagui';

import { CountryTransformer } from '@zix/api';
import ZixAutoCompleteField from '../zix-auto-complete-field/zix-auto-complete-field';
import ZixInput from '../zix-input/zix-input';
import { usePhoneNumber } from './hooks/usePhoneNumber';

export type ZixPhoneFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
  error?: { errorMessage: string };
};

export const ZixPhoneField: React.FC<ZixPhoneFieldProps> = ({
  onValueChange,
  value,
  error,
  ...props
}) => {
  const themeName = useThemeName();

  const {
    selectedCountry,
    setSelectedCountry,
    defaultConfig,
    phone,
    onChange,
  } = usePhoneNumber({
    value,
    onValueChange,
  });

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <XStack flex={1} width="100%" gap="$2">
        <Stack width="30%">
          <ZixAutoCompleteField
            value={selectedCountry}
            onChange={setSelectedCountry}
            api="geography/countries"
            dataMapper={(item: CountryTransformer) => {
              const dial_code = item.dialling?.dial_code;
              const countryCode = dial_code ? `(+${dial_code}) ` : '';

              const name = `${countryCode}${item.name}`;
              return {
                id: `${item.id}`,
                name,
                icon: item.flag,
              }
            }}
            selectTriggerProps={{
              padding: '$2.5',
              gap: '$0',
              scaleIcon: 0.5,
            }}
            disabled={props.disabled}
            {...props}
          />
        </Stack>
        <ZixInput
          flex={1}
          containerProps={{ flex: 1 }}
          disabled={!defaultConfig.dial_code}
          value={phone}
          onChangeText={onChange}
          placeholder={defaultConfig?.mask}
          keyboardType="name-phone-pad"
          inputMode="numeric"
          disabled={props.disabled}
          {...props}
        />
      </XStack>
    </Theme>
  );
};

export default ZixPhoneField;
