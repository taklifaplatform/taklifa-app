
import React from 'react';

import { useTsController } from '@ts-react/form';
import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixCountryField, ZixCountryFieldProps } from '../../fields';

export type CountryFieldProps = ZixCountryFieldProps & {
  containerProps?: BaseFormFieldContainerProps;
};

export const CountryField: React.FC<CountryFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const {
    field,
    error,
  } = useTsController<string>();

  return (
    <FormFieldContainer {...containerProps}>
      <ZixCountryField
        {...props}
        value={field.value}
        onChange={field.onChange}
        hasError={!!error?.errorMessage}
      />
    </FormFieldContainer>
  );
}


export default CountryField;
