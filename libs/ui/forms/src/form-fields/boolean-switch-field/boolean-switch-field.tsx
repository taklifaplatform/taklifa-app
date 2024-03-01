import { useFieldInfo, useTsController } from '@ts-react/form';
import {
  Switch,
  SwitchProps
} from 'tamagui';
import ZixFieldContainer from '../../common/zix-field-container/zix-field-container';

export const BooleanSwitchField = (
  props: Pick<SwitchProps, 'size' | 'native'>
) => {
  const {
    field,
    formState: { isSubmitting },
  } = useTsController<boolean>();
  const disabled = isSubmitting;

  return (
    <ZixFieldContainer
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
      {...props}
    >
      <Switch
        disabled={disabled}
        native
        checked={field.value}
        onCheckedChange={(checked) => field.onChange(checked)}
        ref={field.ref}
        {...props}
      >
        <Switch.Thumb animation="100ms" />
      </Switch>

    </ZixFieldContainer>
  )
};

export default BooleanSwitchField;
