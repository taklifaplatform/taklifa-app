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

  const renderButtonTimeWork = (item: moment.Moment, index: number) => (
    <Button
      key={index}
      padding="$2"
      ai="center"
      h="$2.5"
      bc={
        currentSelectedTime.isSameOrAfter(item) &&
          currentSelectedTime.isSameOrBefore(moment(item).add(1, 'hour'))
          ? '$color5'
          : '$color9'
      }
      onPress={() => {
        onChange?.(item.add(10, 'minute').format('HH:mm').toString())
      }}
      borderRadius="$6"
    >
      <Text theme="alt1" fontSize="$1">
        {item.format('hh:mm A').toString()} -{' '}
        {moment(item).add(1, 'hour').format('hh:mm A').toString()}
      </Text>
    </Button>
  )

  return (
    <Stack flexDirection="row" flexWrap="wrap" rowGap="$2" gap="$2">
      {workTimeSlots.map(renderButtonTimeWork)}
    </Stack>
  )
}


export default ZixRowTimeRangePicker;
