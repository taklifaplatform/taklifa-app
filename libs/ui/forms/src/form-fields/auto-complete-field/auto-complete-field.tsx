import { useStringFieldInfo, useTsController } from '@ts-react/form';

import ZixFieldContainer, { BaseZixFieldContainerProps } from '../../common/zix-field-container/zix-field-container';
import { ZixAutoCompleteField } from '../../fields';


export type AutoCompleteFieldProps = {
  api?: string;
  containerProps?: BaseZixFieldContainerProps;
};

export const AutoCompleteField: React.FC<AutoCompleteFieldProps> = ({
  api = 'geography/countries',
  containerProps = {},
  ...props
}) => {
  const {
    field,
  } = useTsController<string>();
  const { label, placeholder } =
    useStringFieldInfo();

  return (
    <ZixFieldContainer {...containerProps}>
      <ZixAutoCompleteField
        api={api}
        title={label}
        placeholder={placeholder}
        value={field.value}
        onValueChange={(value) => field.onChange(value)}
        {...props}
      />
    </ZixFieldContainer>
  );
}

export default AutoCompleteField;
