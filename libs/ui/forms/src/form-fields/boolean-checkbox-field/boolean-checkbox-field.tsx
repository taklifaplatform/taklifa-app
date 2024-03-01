import { Check } from '@tamagui/lucide-icons';
import { useFieldInfo, useTsController } from '@ts-react/form';
import {
  Checkbox,
  CheckedState
} from 'tamagui';
import ZixFieldContainer, { BaseZixFieldContainerProps } from '../../common/zix-field-container/zix-field-container';

export const BooleanCheckboxField = (props: BaseZixFieldContainerProps) => {
  const {
    field,
    formState: { isSubmitting },
  } = useTsController<CheckedState>();

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
      <Checkbox
        size={props.size || '$5'}
        disabled={isSubmitting}
        checked={field.value}
        onCheckedChange={(checked) => field.onChange(checked)}
        ref={field.ref}
      >
        <Checkbox.Indicator>
          <Check color={'$color1'} size={'$1'} />
        </Checkbox.Indicator>
      </Checkbox>
    </ZixFieldContainer>
  )
};

export default BooleanCheckboxField;
