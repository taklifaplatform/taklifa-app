import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { useFieldInfo, useTsController } from '@ts-react/form';
import React, { useState } from 'react';

import ZixFieldContainer from '../../common/zix-field-container/zix-field-container';
import { ZixInput, ZixInputProps } from '../../fields';



export const TextSecureField: React.FC<ZixInputProps> = (props) => {
  const {
    field,
    error,
  } = useTsController<string>();
  const { placeholder } = useFieldInfo();
  const [showPassword, setShowPassword] = useState(false)


  return (
    <ZixFieldContainer>
      <ZixInput
        hasError={!!error?.errorMessage}
        value={field.value}
        onChangeText={field.onChange}
        ref={field.ref}
        secureTextEntry={!showPassword}
        placeholder={placeholder}
        rightIcon={(props) => showPassword ? (
          <EyeOff {...props} />
        ) : (
          <Eye {...props} />
        )}
        onRightIconPress={() => setShowPassword(!showPassword)}
        {...props}
      />
    </ZixFieldContainer>
  )
};

export default TextSecureField;
