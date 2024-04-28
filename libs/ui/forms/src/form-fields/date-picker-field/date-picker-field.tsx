
import { useTsController } from '@ts-react/form';

import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixDateFieldProps, ZixDatePicker, ZixDaySelection, ZixMonthSelection, ZixRowDatePicker, ZixRowTimeRangePicker, ZixTimePicker, ZixYearSelection } from '../../fields';

export const DateComponents = {
  date_picker: ZixDatePicker,
  time_picker: ZixTimePicker,
  day_selector: ZixDaySelection,
  month_selector: ZixMonthSelection,
  year_selector: ZixYearSelection,
  row_time_range_picker: ZixRowTimeRangePicker,
  row_date_picker: ZixRowDatePicker,
}

export type DatePickerFieldProps = ZixDateFieldProps & {
  containerProps?: BaseFormFieldContainerProps;
  type: 'date_picker' | 'time_picker' | 'day_selector' | 'month_selector' | 'year_selector' | 'row_time_range_picker' | 'row_date_picker'
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  type = 'date_picker',
  containerProps = {},
  ...props
}) => {
  const {
    field,
    error,
  } = useTsController<string>()

  const Component = DateComponents[type]

  return (
    <FormFieldContainer {...containerProps}>
      <Component
        {...props}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        hasError={!!error?.errorMessage}
      />
    </FormFieldContainer>
  )
}

export default DatePickerField;
