import { useMultiLang } from '@zix/i18n'
import { t } from 'i18next'
import moment, { Moment } from 'moment'
import { useEffect, useMemo, useRef } from 'react'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import {
  Button,
  Text,
  View,
  YStack
} from 'tamagui'
import { ZixDateFieldProps } from './types'
import ZixMonthSelection from './zix-month-selection'

const PAGE_WIDTH = 65
// const PAGE_WIDTH = 90
const PAGE_HEIGHT = 80
// const PAGE_HEIGHT = 110

export const ZixRowDatePicker: React.FC<ZixDateFieldProps> = ({
  onChange,
  value,
  min_date
}) => {
  const { activeLang, isRtl } = useMultiLang()
  const carouselRef = useRef<ICarouselInstance>(null)
  const date: Moment = useMemo(() => moment(value ?? undefined), [value])

  const listDays: number[] = useMemo(() => {
    if (!date.isValid() || !date.daysInMonth()) {
      return Array.from(Array(30).keys()).map((i) => i + 1)
    }

    return Array.from(Array(date.daysInMonth()).keys()).map((i) => i + 1)
  }, [date])

  const activeDayIndex = useMemo<number>(
    () => (value ? Number(moment(value).format('D')) - 1 : 0),
    // () => (value ? Number(moment(value).format('D')) - 1 : 15),
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
      flex={1}
      paddingVertical='$2'
      paddingHorizontal='$1'
      alignItems="center"
      marginRight={8}
      flexDirection="column"
      disabled={min_date ? moment(date).date(item).isBefore(min_date) : false}
      disabledStyle={{
        opacity: 0.5
      }}
      theme={activeDayIndex === index ? 'accent' : undefined}
      backgroundColor={activeDayIndex === index ? '$color9' : '$color3'}
      onPress={() => {
        onDateChange(moment(date).date(item))
      }}
    >
      <YStack alignItems='center' justifyContent='space-between' flex={1}>
        <Text fontSize={8}>
          {moment(date).locale(activeLang).date(item).format('dddd')}
        </Text>
        <Text fontSize='$9' fontWeight='900'>
          {item}
        </Text>
        <Text fontSize={10}>
          {moment(date).locale(activeLang).date(item).format('MMMM')}
        </Text>
      </YStack>
    </Button>
  )
  return (
    <>
      <ZixMonthSelection
        width={150}
        selectTriggerProps={{
          height: '$2',
          size: '$4',
        }}
        prependPlaceHolder={<Text fontSize='$1'>{t('common:month')}: </Text>}
        value={date.format('MM')}
        onChange={(month: string) => onDateChange(date.set('month', parseInt(month) - 1))}
      />
      <View paddingVertical='$4'>
        <Carousel
          ref={carouselRef}
          loop={false}
          vertical={false}
          defaultIndex={activeDayIndex}
          data={listDays}
          style={{
            height: PAGE_HEIGHT,
            width: '100%',
            justifyContent: activeDayIndex > 1 ? 'center' : isRtl ? 'flex-end' : 'flex-start',
          }}
          width={PAGE_WIDTH}
          height={PAGE_HEIGHT}
          renderItem={({ item, index }) => renderDayCard(item, index)}
        />
      </View>
    </>
  )
}

export default ZixRowDatePicker;
