
import { useTsController } from '@ts-react/form';

import ZixFieldContainer, { BaseZixFieldContainerProps } from '../../common/zix-field-container/zix-field-container';
import { ZixDatePicker, ZixDaySelection, ZixMonthSelection, ZixRowDatePicker, ZixRowTimeRangePicker, ZixYearSelection } from '../../fields/zix-date-fields';

export type DatePickerFieldProps = BaseZixFieldContainerProps & {
  type: 'date_picker' | 'day_selector' | 'month_selector' | 'year_selector' | 'row_time_range_picker' | 'row_date_picker'
}

export const DateComponents = {
  date_picker: ZixDatePicker,
  day_selector: ZixDaySelection,
  month_selector: ZixMonthSelection,
  year_selector: ZixYearSelection,
  row_time_range_picker: ZixRowTimeRangePicker,
  row_date_picker: ZixRowDatePicker,
}


export function DatePickerField({ type = 'date_picker', ...props }: DatePickerFieldProps) {
  const {
    field,
    error,
  } = useTsController<string>()

  const Component = DateComponents[type]

  return (
    <ZixFieldContainer>
      <Component
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        hasError={!!error?.errorMessage}
      />
    </ZixFieldContainer>
  )
}


export default DatePickerField;
