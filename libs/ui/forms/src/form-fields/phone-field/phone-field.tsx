import { useTsController } from '@ts-react/form';

import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixPhoneField, ZixPhoneFieldProps } from '../../fields';

export type PhoneFieldProps = ZixPhoneFieldProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const PhoneField: React.FC<PhoneFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const { field, error } = useTsController<string>();

  return (
    <FormFieldContainer {...containerProps}>
      <ZixPhoneField
        {...props}
        error={error}
        value={field.value || ''}
        onValueChange={field.onChange}
      />
    </FormFieldContainer>
  )
};

export default PhoneField;
