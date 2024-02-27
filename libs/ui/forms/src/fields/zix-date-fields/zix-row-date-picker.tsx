import moment, { Moment } from 'moment'
import { useEffect, useMemo, useRef } from 'react'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import {
  Button,
  Text,
  YStack
} from 'tamagui'
import { ZixDateFieldProps } from './types'
import ZixMonthSelection from './zix-month-selection'


const PAGE_WIDTH = 120
const PAGE_HEIGHT = 150

export const ZixRowDatePicker: React.FC<ZixDateFieldProps> = ({
  onChange,
  value,
}) => {
  const carouselRef = useRef<ICarouselInstance>(null)
  const date = useMemo(() => moment(value ?? undefined), [value])

  const listDays: number[] = useMemo(() => {
    return Array.from(Array(date.daysInMonth()).keys()).map((i) => i + 1)
  }, [date])

  const activeDayIndex = useMemo<number>(
    () => (value ? Number(moment(value).format('D')) - 1 : 0),
    [value]
  )

  useEffect(() => {
    carouselRef.current?.scrollTo({ index: activeDayIndex, animated: true })
  }, [activeDayIndex])

  const onDateChange = (date: Moment) => {
    onChange?.(date.format('YYYY-MM-DD'))
  }

  const renderDayCard = (item: number, index: number) => (
    <Button
      height="$9"
      width={110}
      alignItems="center"
      margin="$4"
      marginHorizontal="$4"
      flexDirection="column"
      backgroundColor={activeDayIndex === index ? '$color5' : '$color9'}
      onPress={() => {
        onDateChange(moment(date).date(item))
      }}
    >
      <YStack alignItems="center" paddingVertical="$2">
        <Text color="black" fontSize={'$1'}>
          {moment(date).date(item).format('dddd')}
        </Text>
        <Text color="black" fontSize={'$9'} fontWeight={'800'}>
          {item}
        </Text>
        <Text color="black" fontSize={'$1'}>
          {moment(date).date(item).format('MMMM')}
        </Text>
      </YStack>
    </Button>
  )
  return (
    <>
      <ZixMonthSelection
        width={150}
        value={date.format('MM')}
        onChange={(month: string) => onDateChange(date.set('month', parseInt(month) - 1))}
      />
      <Carousel
        ref={carouselRef}
        loop={false}
        defaultIndex={activeDayIndex}
        data={listDays}
        style={{
          width: '100%',
          justifyContent: activeDayIndex > 3 ? 'center' : 'flex-start',
        }}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        renderItem={({ item, index }) => renderDayCard(item, index)}
      />
    </>
  )
}

export default ZixRowDatePicker;
