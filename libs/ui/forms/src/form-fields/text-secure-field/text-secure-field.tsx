import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { useFieldInfo, useTsController } from '@ts-react/form';
import React, { useState } from 'react';

import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixInput, ZixInputProps } from '../../fields';

export type TextSecureFieldProps = ZixInputProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const TextSecureField: React.FC<TextSecureFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const {
    field,
    error,
  } = useTsController<string>();
  const { placeholder } = useFieldInfo();
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormFieldContainer {...containerProps}>
      <ZixInput
        {...props}
        secureTextEntry={!showPassword}
        hasError={!!error?.errorMessage}
        value={field.value}
        onChangeText={field.onChange}
        ref={field.ref}
        placeholder={placeholder}
        leftIcon={(props) => showPassword ? (
          <EyeOff {...props} />
        ) : (
          <Eye {...props} />
        )}
        onRightIconPress={() => setShowPassword(!showPassword)}
      />
    </FormFieldContainer>
  )
};

export default TextSecureField;
