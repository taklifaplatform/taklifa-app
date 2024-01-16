import { useStringFieldInfo, useTsController } from '@ts-react/form';
import { useId } from 'react';

import {
  Fieldset,
  Label,
  SelectProps,
  Theme,
  useThemeName
} from '@zix/app/ui/core';
import { Shake } from '@zix/app/ui/common';
import { ZixPhoneField } from '../../fields';
import { FieldError } from '../../common';

export const PhoneField = (props: Pick<SelectProps, 'size' | 'native'>) => {
  const { field, error } = useTsController<string>();

  const { label, placeholder } = useStringFieldInfo();
  const themeName = useThemeName();
  const id = useId();

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <Fieldset>
        {!!label && (
          <Label
            textAlign="left"
            theme="alt1"
            size={props.size || '$3'}
            htmlFor={id}
          >
            {label}
          </Label>
        )}
        <Shake shakeKey={error?.errorMessage}>
          <ZixPhoneField
            error={error}
            placeholder={placeholder}
            value={field.value || ''}
            onValueChange={field.onChange}
          />
        </Shake>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  );
};

export default PhoneField;
