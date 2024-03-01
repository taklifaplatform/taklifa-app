import { useQuery } from '@tanstack/react-query';
import { GeographyService } from '@zix/api';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useCallback, useMemo, useState } from 'react';
import { formatPhone, FormatPhoneConfig, removeNonDigits } from '../utils';

const getRegionCodeForNumber = (number?: string) => {
  if (!number) return undefined;
  try {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const numberObj = phoneUtil.parseAndKeepRawInput(number);
    return numberObj.getCountryCode();
  } catch (error) {
    return undefined;
  }
};

// generate props & return interfaces
export type UsePhoneNumberProps = {
  /**
   * accepts full formatted phone number ex: +21622074426
   */
  value?: string;
  onValueChange: (phone: string) => void;
};

export function usePhoneNumber({ value, onValueChange }: UsePhoneNumberProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>();

  const preSelectedDialCode = getRegionCodeForNumber(value);

  const { data: defaultConfigData } = useQuery({
    queryFn: async () => {
      return GeographyService.showCountry({
        country: selectedCountry ?? '185',
      });
    },
    queryKey: [
      'country_diallings.dial_code',
      `${selectedCountry}-${preSelectedDialCode}`,
    ],
  });

  const defaultConfig = useMemo<FormatPhoneConfig>(
    () =>
      ({
        prefix: '+',
        dial_code: '966',
        mask: '##-####-#####',
        mask_char: '#',
        charAfterDialCode: ' ',
        trimNonDigitsEnd: true,
        ...(defaultConfigData?.data?.dialling || {}),
      } as FormatPhoneConfig),
    [defaultConfigData]
  );

  // need to extract the country code
  const formattedPhone = useMemo(() => {
    if (!value?.length || !defaultConfig?.dial_code) {
      return '';
    }
    return formatPhone(value, {
      ...defaultConfig,
      disableDialCodeAndPrefix: true,
    });
  }, [value, defaultConfig]);

  const onChange = useCallback(
    (val: string) => {
      const formattedPhone = val?.length
        ? formatPhone(`+${defaultConfig.dial_code}${val}`, defaultConfig)
        : '';

      onValueChange(removeNonDigits(formattedPhone));
    },
    [onValueChange, defaultConfig]
  );

  return {
    selectedCountry,
    setSelectedCountry,
    defaultConfig,
    phone: formattedPhone,
    onChange,
  };
}
