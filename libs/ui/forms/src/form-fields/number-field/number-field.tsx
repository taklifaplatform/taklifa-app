import { useFieldInfo, useTsController } from '@ts-react/form';
import React from 'react';
import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixInput, ZixInputProps } from '../../fields';

export type NumberFieldProps = ZixInputProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const NumberField: React.FC<NumberFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<number>();
  const { placeholder } = useFieldInfo();

  return (
    <FormFieldContainer {...containerProps}>
      <ZixInput
        {...props}
        value={field.value ? String(field.value) : ''}
        onChangeText={(val) => field.onChange(Number(val))}
        ref={field.ref}
        keyboardType='numeric'
        disabled={isSubmitting}
        hasError={!!error?.errorMessage}
        placeholder={placeholder}
      />
    </FormFieldContainer>
  )
};

export default NumberField;
