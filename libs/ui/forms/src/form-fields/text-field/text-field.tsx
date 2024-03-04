import { useFieldInfo, useStringFieldInfo, useTsController } from '@ts-react/form';
import React from 'react';
import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixInput, ZixInputProps } from '../../fields';

export type TextFieldProps = ZixInputProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const TextField: React.FC<TextFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<string>();
  const { maxLength, isEmail } = useStringFieldInfo();
  const { placeholder } = useFieldInfo();

  return (
    <FormFieldContainer {...containerProps}>
      <ZixInput
        {...props}
        value={field.value}
        onChangeText={field.onChange}
        ref={field.ref}
        spellCheck={isEmail ? false : undefined}
        autoCapitalize={isEmail ? 'none' : undefined}
        keyboardType={isEmail ? 'email-address' : undefined}
        disabled={isSubmitting}
        hasError={!!error?.errorMessage}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    </FormFieldContainer>
  )
};

export default TextField;
