import { useFieldInfo, useTsController } from '@ts-react/form';
import { useId } from 'react';
import {
  Fieldset,
  Label,
  Switch,
  SwitchProps,
  Theme,
  useThemeName,
  XStack
} from '@zix/app/ui/core';
import { FieldError } from '../../common';

export const BooleanSwitchField = (
  props: Pick<SwitchProps, 'size' | 'native'>
) => {
  const {
    field,
    error,
    formState: { isSubmitting }
  } = useTsController<boolean>();
  const { label, isOptional } = useFieldInfo();
  const id = useId();
  const themeName = useThemeName();
  const disabled = isSubmitting;

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <Fieldset alignItems="flex-start">
        <XStack gap="$3" marginTop={'$4'} alignItems="center">
          <Switch
            disabled={disabled}
            native
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked)}
            ref={field.ref}
            id={id}
            {...props}
          >
            <Switch.Thumb animation="100ms" />
          </Switch>

          {!!label && (
            <Label theme="alt1" size={props.size || '$3'} htmlFor={id}>
              {label} {isOptional && `(Optional)`}
            </Label>
          )}
        </XStack>

        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  );
};

export default BooleanSwitchField;
