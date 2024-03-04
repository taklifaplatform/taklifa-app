import { useNumberFieldInfo, useTsController } from '@ts-react/form';
import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixInput, ZixInputProps } from '../../fields';

export type CodeInputFieldProps = ZixInputProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const CodeInputField: React.FC<CodeInputFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const { field } = useTsController<number>();

  return (
    <FormFieldContainer {...containerProps} fieldInfo={useNumberFieldInfo}>
      <ZixInput
        {...props}
        value={String(field.value)}
        onChangeText={(text) => field.onChange(Number(text))}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
      />
    </FormFieldContainer>
  );
};

export default CodeInputField;
