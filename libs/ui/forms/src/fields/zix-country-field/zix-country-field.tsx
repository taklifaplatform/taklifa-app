import { CheckCircle2 } from '@tamagui/lucide-icons';
import { CountryTransformer } from '@zix/api';
import { Select, SelectProps } from 'tamagui';
import { t } from 'i18next';
import React from 'react';
import {
  ZixAutoCompleteField,
  ZixAutoCompleteFieldProps,
} from '../zix-auto-complete-field/zix-auto-complete-field';

export type ZixCountryFieldProps = {
  hideFlag?: boolean;
  hideCode?: boolean;
} & ZixAutoCompleteFieldProps &
  Pick<SelectProps, 'size' | 'native'>;

export const ZixCountryField: React.FC<Partial<ZixCountryFieldProps>> = (
  props
) => {
  return (
    <ZixAutoCompleteField
      api="geography/countries"
      title={t('common:select_country')}
      isMultiLang
      numberOfItemsToShow={40}
      orderBy="sort"
      selectQuery={`id, name, flag, country_diallings (id, dial_code)`}
      renderItem={(item: CountryTransformer, index: number) => {
        const dial_code = item.dialling?.dial_code;
        const countryCode = dial_code ? `(+${dial_code})` : '';

        const name = `${!props.hideFlag && item.flag ? item.flag : ''} ${
          !props.hideCode ? countryCode : ''
        } ${item.name}`;

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
