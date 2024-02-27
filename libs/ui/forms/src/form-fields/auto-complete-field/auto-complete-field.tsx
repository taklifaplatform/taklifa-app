import { useStringFieldInfo, useTsController } from '@ts-react/form';
import { useId } from 'react';
import { InputProps } from 'tamagui';

import { FieldContainer, ZixAutoCompleteField, ZixAutoCompleteFieldProps } from '../../fields';


export type AutoCompleteFieldProps = ZixAutoCompleteFieldProps & Pick<InputProps, 'size' | 'autoFocus' | 'secureTextEntry'>


export function AutoCompleteField({
  api = 'geography/countries',
}: AutoCompleteFieldProps) {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<string>();
  const { label, placeholder, isOptional } =
    useStringFieldInfo();
  const id = useId();

  return (
    <FieldContainer
      id={id}
      error={!!error?.errorMessage}
      errorMessage={error?.errorMessage}
      required={!isOptional}
      label={label}
    >
      <ZixAutoCompleteField
        api={api}
        title={label}
        placeholder={placeholder}
        value={field.value}
        onValueChange={(value) => field.onChange(value)}
      />
    </FieldContainer>
  );
}

export default AutoCompleteField;
