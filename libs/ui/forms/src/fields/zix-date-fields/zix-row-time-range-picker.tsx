import moment from 'moment'
import { useMemo } from 'react'
import {
  Button,
  Stack,
  Text
} from 'tamagui'
import { ZixDateFieldProps } from './types'

export const ZixRowTimeRangePicker: React.FC<ZixDateFieldProps> = ({
  onChange,
  value,
}) => {
  const workTimeSlots = Array.from(Array(8).keys()).map((i) =>
    moment('09:00', 'HH:mm').add(i, 'hours')
  )

  const currentSelectedTime = useMemo(() => moment(value, 'HH:mm A'), [value])

  const renderButtonTimeWork = (item: moment.Moment, index: number) => {
    const isActive = (
      currentSelectedTime.isSameOrAfter(item) &&
      currentSelectedTime.isSameOrBefore(moment(item).add(1, 'hour'))
    )

    return (
      <Button
        key={index}
        paddingVertical="$2"
        paddingHorizontal="$4"
        height="$2.5"
        theme={isActive ? 'accent' : undefined}
        backgroundColor={
          isActive
            ? '$color9'
            : '$color3'
        }
        onPress={() => {
          onChange?.(item.add(10, 'minute').format('HH:mm').toString())
        }}
        borderRadius="$4"
      >
        <Text fontWeight='700' fontSize="$1">
          {item.format('hh:mm A').toString()} -{' '}
          {moment(item).add(1, 'hour').format('hh:mm A').toString()}
        </Text>
      </Button>
    )
  }

  return (
    <Stack flexDirection="row" flexWrap="wrap" rowGap="$2" gap="$2">
      {workTimeSlots.map(renderButtonTimeWork)}
    </Stack>
  )
}


export default ZixRowTimeRangePicker;
