import { CountryTransformer } from '@zix/api';
import React from 'react';
import {
  ZixAutoCompleteField, ZixAutoCompleteFieldProps
} from '../zix-auto-complete-field/zix-auto-complete-field';

export type ZixCountryFieldProps = Partial<ZixAutoCompleteFieldProps>;

export const ZixCountryField: React.FC<ZixCountryFieldProps> = (
  props
) => {
  return (
    <ZixAutoCompleteField
      {...props}
      api="geography/countries"
      dataMapper={(item: CountryTransformer) => ({
        id: `${item.id}`,
        name: item.name,
        icon: item.flag,
      })}
    />
  );
};

export default ZixCountryField;
