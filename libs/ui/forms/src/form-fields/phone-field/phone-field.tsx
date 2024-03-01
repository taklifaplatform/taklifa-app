import { useTsController } from '@ts-react/form';

import { SelectProps } from 'tamagui';
import ZixFieldContainer from '../../common/zix-field-container/zix-field-container';
import { ZixPhoneField } from '../../fields';

export const PhoneField = (props: Pick<SelectProps, 'size' | 'native'>) => {
  const { field, error } = useTsController<string>();

  return (
    <ZixFieldContainer>
      <ZixPhoneField
        error={error}
        value={field.value || ''}
        onValueChange={field.onChange}
      />
    </ZixFieldContainer>
  )
};

export default PhoneField;
