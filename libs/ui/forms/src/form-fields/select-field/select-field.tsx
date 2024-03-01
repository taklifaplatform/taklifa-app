import { useTsController } from '@ts-react/form';
import React from 'react';

import ZixFieldContainer from '../../common/zix-field-container/zix-field-container';
import { ZixSelectField, ZixSelectFieldProps } from '../../fields';

export const SelectField: React.FC<ZixSelectFieldProps> = (props) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<string>();
  return (
    <ZixFieldContainer>
      <ZixSelectField
        disabled={isSubmitting}
        hasError={!!error?.errorMessage}
        value={field.value}
        onChange={field.onChange}
        {...props}
      />
    </ZixFieldContainer>
  );
}

export default SelectField;
