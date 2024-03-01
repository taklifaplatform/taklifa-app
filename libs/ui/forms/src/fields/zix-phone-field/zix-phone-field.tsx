import { Input, Stack, Theme, XStack, useThemeName } from 'tamagui';

import { useMultiLang } from '@zix/i18n';
import ZixCountryField from '../zix-country-field/zix-country-field';
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
}) => {
  const themeName = useThemeName();
  const { isRtl } = useMultiLang();

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
      <XStack flex={1} width="100%" space="$2">
        <Stack width="30%">
          <ZixCountryField
            value={selectedCountry}
            onValueChange={setSelectedCountry}
          />
        </Stack>
        <Input
          flex={1}
          height="$5"
          disabled={!defaultConfig.dial_code}
          value={phone}
          onChangeText={onChange}
          placeholder={defaultConfig?.mask}
          keyboardType="name-phone-pad"
          inputMode="numeric"
          borderWidth="$0.25"
          borderColor="$color10"
          backgroundColor="$color2"
          textAlign={isRtl ? 'right' : 'left'}
        />
      </XStack>
    </Theme>
  );
};

export default ZixPhoneField;
