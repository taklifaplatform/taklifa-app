import { useTsController } from '@ts-react/form';
import React from 'react';

import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixSelectRowOptionField, ZixSelectRowOptionFieldProps } from '../../fields';

export type SelectRowOptionFieldProps = ZixSelectRowOptionFieldProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const SelectRowOptionField: React.FC<SelectRowOptionFieldProps> = ({
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
      <ZixSelectRowOptionField
        {...props}
        disabled={isSubmitting}
        hasError={!!error?.errorMessage}
        value={field.value}
        onChange={field.onChange}
      />
    </FormFieldContainer>
  );
}

export default SelectRowOptionField;
