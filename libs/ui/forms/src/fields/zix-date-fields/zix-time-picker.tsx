import {
  FocusedInput,
  START_DATE,
  useDatepicker
} from '@datepicker-react/hooks'
import { usePopoverState } from '@zix/ui/common'
import { useId, useState } from 'react'
import { Platform } from 'react-native'
import { Input, XGroup, XStack, useMedia } from 'tamagui'
import { ZixDatepickerProvider } from './utils/date-picker-provider'
import { ZixDatepickerPopover } from './zix-date-picker-popover'
import { getLocaleDate } from './utils/utils'
import { ZixDatepickerProps } from './utils/types'
import { ZixDateFieldProps } from './types'

// change language see: https://github.com/tomgreenwood1/react-datepicker/blob/master/packages/styled/src/components/DateRangeInput/DateRangeInput.stories.tsx#L228

export function ZixTimePicker({
  numberOfMonths,
  isRangePicker,
  onChange,
  labelFunctions,
  startDate = null,
  endDate = null,
  required,
  error,
  helperText,
  helperTextProps,
  label,
  labelProps,
  labelInline,
  fullWidth,
  inputProps,
  buttonProps,
  popoverProps,
  containerProps,
  size = '$5',
}: ZixDateFieldProps) {
  const id = useId()
  const media = useMedia()
  const popoverState = usePopoverState(false)
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(START_DATE)
  const monthsCount: number = isRangePicker ? (media.xs ? 1 : numberOfMonths ?? 2) : 1

  const { activeMonths, firstDayOfWeek, ...context } = useDatepicker({
    startDate: startDate,
    endDate: endDate,
    focusedInput: focusedInput as FocusedInput,
    onDatesChange: (data) => {
      setFocusedInput(data.focusedInput ?? START_DATE)
      if (typeof onChange === 'function') {
        onChange(data)
      }
      if (!isRangePicker) {
        popoverState.onOpenChange(false)
      }
    },
    numberOfMonths: monthsCount,
    ...(!isRangePicker && {
      minBookingDays: 1,
      exactMinBookingDays: true,
    }),
  })

  const getInputValue = isRangePicker
    ? `${getLocaleDate({ date: startDate })}${endDate ? ' - ' + getLocaleDate({ date: endDate }) : ''
    }`
    : getLocaleDate({ date: startDate })
  return (
    <ZixDatepickerProvider {...context}>
      {/* <ZixFormFieldContainer
        id={id}
        error={error}
        required={required}
        labelProps={labelProps}
        label={label}
        labelInline={labelInline}
        helperText={helperText}
        helperTextProps={helperTextProps}
        fullWidth={fullWidth}
        size={size}
        {...containerProps}
      > */}
      <XStack
        {...(fullWidth
          ? {
            flexGrow: 1,
          }
          : {
            width: Platform.OS === 'web' ? '100%' : undefined,
          })}
      >
        <XGroup flexGrow={fullWidth ? 1 : undefined} alignItems={'center'} flexDirection={'row'}>
          <XGroup.Item>
            <Input
              width={'100%'}
              minWidth={isRangePicker ? '$16' : undefined}
              value={getInputValue}
              onPressIn={() => popoverState.onOpenChange(true)}
              size={size}
              {...inputProps}
            />
          </XGroup.Item>
          <XGroup.Item>
            <ZixDatepickerPopover
              activeMonths={activeMonths}
              monthsCount={monthsCount}
              firstDayOfWeek={firstDayOfWeek}
              labelFunctions={labelFunctions}
              buttonProps={buttonProps}
              size={size}
              {...popoverState}
              {...popoverProps}
            />
          </XGroup.Item>
        </XGroup>
      </XStack>
      {/* </ZixFormFieldContainer> */}
    </ZixDatepickerProvider>
  )
}
