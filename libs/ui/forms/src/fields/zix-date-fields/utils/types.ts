import { OnDatesChangeProps, UseMonthProps } from '@datepicker-react/hooks'
import { ZixPopoverProps } from '@zix/ui/common'
import { ButtonProps, InputProps, SizeTokens, ThemeableStackProps } from 'tamagui'
// import { ZixFormContainerBaseTypes } from '../types'
// import { ZixPopoverProps } from '../../Panels'
// TODO: remove this
export type ZixDatepickerProps =  {
  startDate?: Date | null
  endDate?: Date | null
  value?: Date | null
  numberOfMonths?: number
  isRangePicker?: boolean
  onChange?: (data: OnDatesChangeProps) => void
  labelFunctions?: Pick<UseMonthProps, 'dayLabelFormat' | 'weekdayLabelFormat' | 'monthLabelFormat'>
  fullWidth?: boolean
  inputProps?: InputProps
  buttonProps?: ButtonProps
  containerProps?: ThemeableStackProps
  popoverProps?: Omit<ZixPopoverProps, 'trigger'>
  size?: SizeTokens
}

export type DaysForLocaleProps = {
  localeName?: string;
  format?: string;
};

export type YearsForLocaleProps = {
  startYear: number;
  duration: number;
};

