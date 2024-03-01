import { CountryTransformer } from '@zix/api';
import React from 'react';
import {
  ZixAutoCompleteField, ZixAutoCompleteFieldProps
} from '../zix-auto-complete-field/zix-auto-complete-field';


export const ZixCountryField: React.FC<ZixAutoCompleteFieldProps> = (
  props
) => {
  return (
    <ZixAutoCompleteField
      {...props}
      api="geography/countries"
      dataMapper={(item: CountryTransformer) => {
        const dial_code = item.dialling?.dial_code;
        const countryCode = dial_code ? ` (+${dial_code})` : '';

        const name = `${item.name}${countryCode}`;
        return {
          id: `${item.id}`,
          name,
        }
      }}
    />
  );
};

export default ZixCountryField;
