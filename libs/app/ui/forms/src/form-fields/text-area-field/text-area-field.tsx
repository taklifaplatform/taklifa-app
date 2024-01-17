import { useFieldInfo, useTsController } from '@ts-react/form';
import { TextAreaProps } from '@zix/app/ui/core';
import { ZixInput } from '../../fields';

export type TextAreaFieldProps = Pick<TextAreaProps, 'size' | 'autoFocus'>;

export function TextAreaField(props: TextAreaFieldProps) {
  const {
    field,
    error,
    formState: { isSubmitting }
  } = useTsController<string>();
  const { label, isOptional, placeholder } = useFieldInfo();

  return (
    <ZixInput
      multiline={true}
      ref={field.ref}
      required={!isOptional}
      label={label}
      placeholder={placeholder}
      error={!!error?.errorMessage}
      helperText={error?.errorMessage}
      disabled={isSubmitting}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      {...props}
    />
  );
}

export default TextAreaField;
