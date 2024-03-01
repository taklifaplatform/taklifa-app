import { useNumberFieldInfo, useTsController } from '@ts-react/form';
import {
  Input,
  InputProps
} from 'tamagui';
import ZixFieldContainer from '../../common/zix-field-container/zix-field-container';

export const CodeInputField = (
  propsCode: Pick<InputProps, 'size' | 'autoFocus'>
) => {
  const { field } = useTsController<number>();

  return (
    <ZixFieldContainer fieldInfo={useNumberFieldInfo}>
      <Input
        value={String(field.value)}
        onChangeText={(text) => field.onChange(Number(text))}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        {...propsCode}
      />
    </ZixFieldContainer>
  );
};

export default CodeInputField;
