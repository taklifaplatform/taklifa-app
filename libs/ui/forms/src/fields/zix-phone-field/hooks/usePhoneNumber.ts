import { useQuery } from '@tanstack/react-query';
import { GeographyService } from '@zix/api';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { formatPhone, FormatPhoneConfig, removeNonDigits } from '../utils';

const phoneUtil = PhoneNumberUtil.getInstance();

const getRegionCodeForNumber = (number?: string) => {
  if (!number) return undefined;
  try {
    const numberObj = phoneUtil.parseAndKeepRawInput(number);
    return String(numberObj.getCountryCode());
  } catch (error) {
    return undefined;
  }
};

export type UsePhoneNumberProps = {
  /**
   * accepts full formatted phone number ex: +21622074426
   */
  value?: string;
  onValueChange: (phone: string) => void;
};

export function usePhoneNumber({ value, onValueChange }: UsePhoneNumberProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>();

  const { data: defaultConfigData } = useQuery({
    queryFn: async () => {
      return GeographyService.showCountry({
        country: selectedCountry ?? '185',
      });
    },
    queryKey: ['GeographyService.showCountry', selectedCountry],
  });

  const getForceValue = (_value: string | undefined) => {
    if (!_value) return '966';
    let newValue = _value;
    // if the value doesn't start with + add it
    if (!_value?.startsWith('+')) {
      newValue = `+${_value}`;
    }

    // if the value lent less 6 add random number
    if (newValue.length < 6) {
      newValue = `${newValue} ${Math.floor(Math.random() * 1000)}`;
    }

    return newValue;
  };
  const dialCode = getRegionCodeForNumber(getForceValue(value));

  useEffect(() => {
    console.log('===========');
    console.log('dialCode:::', dialCode, 'value:::', value);
    if (dialCode && !selectedCountry) {
      GeographyService.getCountryByDialCode({
        dialCode,
      }).then((data) => {
        if (data.data?.id) {
          setSelectedCountry(String(data.data?.id));
        }
      });
    }
  }, [value, dialCode, selectedCountry]);

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
      }) as FormatPhoneConfig,
    [defaultConfigData],
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
    [onValueChange, defaultConfig],
  );

  return {
    selectedCountry,
    setSelectedCountry,
    defaultConfig,
    phone: formattedPhone,
    onChange,
  };
}
