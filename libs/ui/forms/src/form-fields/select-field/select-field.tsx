import { useTsController } from '@ts-react/form';
import React from 'react';

import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixSelectField, ZixSelectFieldProps } from '../../fields';

export type SelectFieldProps = ZixSelectFieldProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<string>();
  return (
    <FormFieldContainer {...containerProps}>
      <ZixSelectField
        {...props}
        disabled={isSubmitting}
        hasError={!!error?.errorMessage}
        value={field.value}
        onChange={field.onChange}
      />
    </FormFieldContainer>
  );
}

export default SelectField;
