import { Check } from '@tamagui/lucide-icons';
import { useFieldInfo, useTsController } from '@ts-react/form';
import {
  Checkbox,
  CheckedState
} from 'tamagui';
import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';

export type BooleanCheckboxFieldProps = BaseFormFieldContainerProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const BooleanCheckboxField: React.FC<BooleanCheckboxFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const {
    field,
    formState: { isSubmitting },
  } = useTsController<CheckedState>();

  return (
    <FormFieldContainer
      fieldInfo={useFieldInfo}
      labelInline
      fieldContainerProps={{
        flex: 0
      }}
      labelShowRequiredAsterisk={false}
      {...containerProps}
      stackContainerProps={{
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        ...(containerProps?.stackContainerProps || {}),
      }}
    >
      <Checkbox
        theme='accent'
        {...props}
        size={props.size || '$5'}
        disabled={isSubmitting}
        checked={field.value}
        onCheckedChange={(checked) => field.onChange(checked)}
        backgroundColor="white"
        ref={field.ref}
      >
        <Checkbox.Indicator>
          <Check color='$color1' size='$1' />
        </Checkbox.Indicator>
      </Checkbox>
    </FormFieldContainer>
  )
};

export default BooleanCheckboxField;
