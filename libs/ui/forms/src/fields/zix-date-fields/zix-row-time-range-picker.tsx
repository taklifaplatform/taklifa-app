import moment from 'moment'
import { useMemo } from 'react'
import {
  Button,
  Stack,
  Text,
  XStack
} from 'tamagui'
import { ZixDateFieldProps } from './types'
import { useMultiLang } from '@zix/i18n'

export const ZixRowTimeRangePicker: React.FC<ZixDateFieldProps> = ({
  onChange,
  value,
}) => {
  const { activeLang } = useMultiLang()
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
        <XStack alignItems='center' gap='$1'>
          <Text fontWeight='700' fontSize="$1">
            {item.format('hh:mm').toString()}
          </Text>
          <Text fontWeight='700' fontSize="$1">
            {moment(item).locale(activeLang).format('A').toString()}
          </Text>
          <Text>-</Text>
          <Text fontWeight='700' fontSize="$1">
            {moment(item).add(1, 'hour').format('hh:mm').toString()}
          </Text>
          <Text fontWeight='700' fontSize="$1">
            {moment(item).add(1, 'hour').locale(activeLang).format('A').toString()}
          </Text>

        </XStack>
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
