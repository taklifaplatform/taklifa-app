import moment, { Moment } from "moment";
import { useMemo } from "react";
import { XStack } from "tamagui";

import ZixDaySelection from "./zix-day-selection";
import ZixMonthSelection from "./zix-month-selection";
import ZixYearSelection from "./zix-year-selection";


export type ZixDateSelectionProps = {
  value: string;
  onChange: (value: string) => void;
}


export const ZixDateSelection: React.FC<ZixDateSelectionProps> = ({
  value,
  onChange,
}) => {

  const date = useMemo(() => {
    return moment.utc(value)
  }, [value])

  const onDateChange = (date: Moment) => {
    onChange(date.format('YYYY-MM-DD'))
  }

  return (
    <XStack gap='$2'>
      <ZixDaySelection
        width={100}
        value={date.format('D')}
        onValueChange={(day: string) => onDateChange(date.set('date', parseInt(day)))}
      />
      <ZixMonthSelection
        width={100}
        value={date.format('M')?.toString()}
        onValueChange={(month: string) => {
          // TODO: check why we had to subtract 1 from the month
          onDateChange(date.set('month', parseInt(month) - 1))
        }}
      />
      <ZixYearSelection
        width={100}
        value={date.year()}
        onValueChange={(year: string) => onDateChange(date.set('year', parseInt(year)))}
      />
    </XStack>
  )
}
