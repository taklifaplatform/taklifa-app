import { useFieldInfo, useTsController } from '@ts-react/form';
import {
  Switch,
  SwitchProps
} from 'tamagui';
import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';

export type BooleanSwitchFieldProps = SwitchProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const BooleanSwitchField: React.FC<BooleanSwitchFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const {
    field,
    formState: { isSubmitting },
  } = useTsController<boolean>();
  const disabled = isSubmitting;

  return (
    <FormFieldContainer
      fieldInfo={useFieldInfo}
      labelInline
      containerProps={{
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
      }}
      fieldContainerProps={{
        flex: 0
      }}
      labelShowRequiredAsterisk={false}
      {...containerProps}
    >
      <Switch
        {...props}
        disabled={disabled}
        native
        checked={field.value}
        onCheckedChange={(checked) => field.onChange(checked)}
        ref={field.ref}
      >
        <Switch.Thumb animation="100ms" />
      </Switch>
    </FormFieldContainer>
  )
};

export default BooleanSwitchField;
