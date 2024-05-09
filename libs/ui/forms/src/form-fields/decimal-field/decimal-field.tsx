import { useFieldInfo, useTsController } from '@ts-react/form';
import React from 'react';
import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixInput, ZixInputProps } from '../../fields';

export type DecimalFieldProps = ZixInputProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const DecimalField: React.FC<DecimalFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<string>();
  const { placeholder } = useFieldInfo();

  return (
    <FormFieldContainer {...containerProps}>
      <ZixInput
        {...props}
        value={field.value}
        onChangeText={field.onChange}
        ref={field.ref}
        keyboardType='decimal-pad'
        disabled={isSubmitting}
        hasError={!!error?.errorMessage}
        placeholder={placeholder}
      />
    </FormFieldContainer>
  )
};

export default DecimalField;
