import { useTsController } from '@ts-react/form';
import { z } from "zod";

import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixMoneyField, ZixMoneyFieldProps } from '../../fields';

export type MoneyFieldProps = ZixMoneyFieldProps & {
  containerProps?: BaseFormFieldContainerProps;
}

export const MoneySchema = z.object({
  value: z.any(),
  currency_id: z.any(),
})

export const MoneyField: React.FC<MoneyFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const { field, error } = useTsController<z.infer<typeof MoneySchema>>();

  return (
    <FormFieldContainer {...containerProps}>
      <ZixMoneyField
        {...props}
        error={error}
        value={field.value || {}}
        onValueChange={field.onChange}
      />
    </FormFieldContainer>
  )
};

export default MoneyField;
