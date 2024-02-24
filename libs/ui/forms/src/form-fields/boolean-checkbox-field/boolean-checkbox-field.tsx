import { Check } from '@tamagui/lucide-icons';
import { useFieldInfo, useTsController } from '@ts-react/form';
import {
  Checkbox,
  CheckboxProps,
  CheckedState,
  Fieldset,
  Label,
  Theme,
  XStack,
  useThemeName,
} from 'tamagui';
import { useId } from 'react';
import { FieldError } from '../../common';

export interface BooleanCheckboxFieldProps
  extends Pick<CheckboxProps, 'size' | 'native'> {
  prepend?: React.ReactNode;
}

export const BooleanCheckboxField = (props: BooleanCheckboxFieldProps) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<CheckedState>();
  const { label, isOptional } = useFieldInfo();
  const id = useId();
  const themeName = useThemeName();
  const disabled = isSubmitting;

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <Fieldset>
        <XStack gap="$3" marginTop={'$4'} alignItems="center">
          <Theme name={error ? 'red' : 'light'}>
            <Checkbox
              size={props.size || '$5'}
              disabled={disabled}
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
              ref={field.ref}
              id={id}
              borderWidth={0}
              {...props}
            >
              <Checkbox.Indicator>
                <Check color={'$color1'} size={'$1'} />
              </Checkbox.Indicator>
            </Checkbox>
          </Theme>
          {!!label && (
            <XStack alignItems="center" gap="$2">
              <Label
                textAlign="left"
                theme="alt1"
                size={props.size || '$3'}
                htmlFor={id}
              >
                {label} {isOptional && `(Optional)`}
              </Label>
              {props.prepend && props.prepend}
            </XStack>
          )}
        </XStack>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  );
};

export default BooleanCheckboxField;
