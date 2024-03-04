import { useStringFieldInfo, useTsController } from '@ts-react/form';

import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixAutoCompleteField, ZixAutoCompleteFieldProps } from '../../fields';


export type AutoCompleteFieldProps = ZixAutoCompleteFieldProps & {
  containerProps?: BaseFormFieldContainerProps;
};

export const AutoCompleteField: React.FC<AutoCompleteFieldProps> = ({
  api = 'geography/countries',
  containerProps = {},
  ...props
}) => {
  const { field } = useTsController<string>();
  const { placeholder } = useStringFieldInfo();

  return (
    <FormFieldContainer {...containerProps}>
      <ZixAutoCompleteField
        {...props}
        api={api}
        placeholder={placeholder}
        value={field.value}
        onValueChange={(value) => field.onChange(value)}
      />
    </FormFieldContainer>
  );
}

export default AutoCompleteField;
