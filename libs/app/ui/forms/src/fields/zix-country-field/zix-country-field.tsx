import { CheckCircle2 } from '@tamagui/lucide-icons';
import { Select, SelectProps } from '@zix/app/ui/core';
import { useMultiLang } from '@zix/i18n';
import { Tables } from '@zix/core/supabase';
import { t } from 'i18next';
import React from 'react';
import {
  ZixAutoCompleteField,
  ZixAutoCompleteFieldProps
} from '../zix-auto-complete-field/zix-auto-complete-field';

export type ZixCountryFieldProps = {
  hideFlag?: boolean;
  hideCode?: boolean;
} & ZixAutoCompleteFieldProps &
  Pick<SelectProps, 'size' | 'native'>;

export type CountryWithDialling = Tables<'countries'> & {
  country_diallings: Tables<'country_diallings'>[];
  name: {
    en: string;
    ar: string;
  };
};

export const ZixCountryField: React.FC<Partial<ZixCountryFieldProps>> = (
  props
) => {
  const { activeLang } = useMultiLang();

  return (
    <ZixAutoCompleteField
      tableName="countries"
      title={t('common:select_country')}
      isMultiLang
      numberOfItemsToShow={40}
      orderBy='order'
      selectQuery={`id, name, flag, country_diallings (id, dial_code)`}
      renderItem={(item: CountryWithDialling, index: number) => {
        const dial_code = item.country_diallings?.length
          ? item.country_diallings?.[0]?.dial_code
          : '';
        const countryCode = dial_code ? `(+${dial_code})` : '';

        const name = `${!props.hideFlag && item.flag ? item.flag : ''} ${
          !props.hideCode ? countryCode : ''
        } ${(item.name as any)?.[activeLang] ?? (item.name as any)?.['en']}`;

        return (
          <Select.Item
            index={item.id}
            key={`${item.id}-${index}`}
            value={`${item.id}`}
            margin="$2"
            width="100%"
          >
            <Select.ItemText>{name}</Select.ItemText>
            <Select.ItemIndicator marginLeft="auto">
              <CheckCircle2 size="$2" color="$color5" />
            </Select.ItemIndicator>
          </Select.Item>
        );
      }}
      placeholder={t('forms:labels.code')}
      {...props}
    />
  );
};

export default ZixCountryField;
