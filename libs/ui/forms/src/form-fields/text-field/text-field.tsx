import { useFieldInfo, useStringFieldInfo, useTsController } from '@ts-react/form';
import React from 'react';
import ZixFieldContainer from '../../common/zix-field-container/zix-field-container';
import { ZixInput, ZixInputProps } from '../../fields';


export const TextField: React.FC<ZixInputProps> = (props) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<string>();
  const { maxLength, isEmail } = useStringFieldInfo();
  const { placeholder } = useFieldInfo();

  return (
    <ZixFieldContainer>
      <ZixInput
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
        {...props}
      />
    </ZixFieldContainer>
  )
};

export default TextField;
