import { useFieldInfo, useTsController } from '@ts-react/form';
import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixInput, ZixInputProps } from '../../fields';

export type TextAreaFieldProps = ZixInputProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
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
        disabled={isSubmitting}
        hasError={!!error?.errorMessage}
        placeholder={placeholder}
        isMultiline
      />
    </FormFieldContainer>
  );
};

export default TextAreaField;
