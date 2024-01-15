import { useStringFieldInfo, useTsController } from '@ts-react/form';
import React from 'react';
import { InputProps, SizeTokens } from 'tamagui';
import { ZixInput } from '../../fields';

export interface TextFieldProps
  extends Pick<InputProps, 'size' | 'autoFocus' | 'secureTextEntry'> {
  leftIcon?: React.FC<{ isFocused: boolean; size: SizeTokens; color: string }>;
  rightIcon?: React.FC<{ isFocused: boolean; size: SizeTokens; color: string }>;
}

/**
 * A text input field component.
 *
 * @component
 * @example
 * // Usage:
 * <TextField
 *   secureTextEntry={true}
 * />
 *
 * @param {TextFieldProps} props - The props for the TextField component.
 * @returns {React.ReactElement} The rendered TextField component.
 */
export const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    field,
    error,
    formState: { isSubmitting }
  } = useTsController<string>();
  const { label, placeholder, isOptional, maxLength, isEmail } =
    useStringFieldInfo();

  return (
    <ZixInput
      collapsible
      ref={field.ref}
      required={!isOptional}
      label={label}
      placeholder={placeholder}
      error={!!error?.errorMessage}
      errorMessage={error?.errorMessage}
      isPassword={props.secureTextEntry}
      spellCheck={isEmail ? false : undefined}
      autoCapitalize={isEmail ? 'none' : undefined}
      keyboardType={isEmail ? 'email-address' : undefined}
      disabled={isSubmitting}
      maxLength={maxLength}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      {...props}
    />
  );
};

export default TextField;
