import { useTsController } from '@ts-react/form';
import React from 'react';

import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import {
  ZixSelectRadioGroupField,
  ZixSelectRowOptionFieldProps,
} from '../../fields';

export type SelectRadioGroupFieldProps = ZixSelectRowOptionFieldProps & {
  containerProps?: BaseFormFieldContainerProps;
};

export const SelectRadioGroupField: React.FC<SelectRadioGroupFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<number>();
  return (
    <FormFieldContainer {...containerProps}>
      <ZixSelectRadioGroupField
        {...props}
        // disabled={isSubmitting}
        hasError={!!error?.errorMessage}
        value={field.value}
        onChange={field.onChange}
      />
    </FormFieldContainer>
  );
};

export default SelectRadioGroupField;
