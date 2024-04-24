import { MonthType } from '@datepicker-react/hooks'
import { Button, ButtonProps, XStack } from 'tamagui'
import { Month, MonthProps } from './utils/month'
import { ZixDatepickerProps } from './utils/types'

import { Calendar } from '@tamagui/lucide-icons'
import { ZixPopover, ZixPopoverProps } from '@zix/ui/common'

type ZixDatepickerPopoverProps = Omit<ZixPopoverProps, 'trigger'> & {
  activeMonths: MonthType[]
  monthsCount: number
  firstDayOfWeek: MonthProps['firstDayOfWeek']
  labelFunctions: ZixDatepickerProps['labelFunctions']
  buttonProps?: ButtonProps
}

export function ZixDatepickerPopover({
  activeMonths,
  monthsCount,
  firstDayOfWeek,
  labelFunctions,
  buttonProps,
  size,
  ...popoverProps
}: ZixDatepickerPopoverProps) {
  return (
    <ZixPopover
      isBouncy={true}
      {...popoverProps}
      contentProps={{
        padding: '$4',
        elevation: '$5',
        ...popoverProps?.contentProps,
      }}
      trigger={
        <Button
          icon={Calendar}
          borderColor="$color10"
          borderWidth="$0.25"
          borderLeftWidth={0}
          borderTopLeftRadius={'$0'}
          borderBottomLeftRadius={'$0'}
          backgroundColor="transparent"
          size={size}
          {...buttonProps}
        />
      }
    >
      <XStack space alignItems={'flex-start'}>
        {activeMonths.map((month, index) => (
          <Month
            key={`${month.year}-${month.month}`}
            year={month.year}
            month={month.month}
            monthsCount={monthsCount}
            firstDayOfWeek={firstDayOfWeek}
            isFirst={monthsCount === 0 || index === 0}
            isLast={monthsCount === 0 || index === monthsCount - 1}
            {...labelFunctions}
          />
        ))}
      </XStack>
    </ZixPopover>
  )
}
