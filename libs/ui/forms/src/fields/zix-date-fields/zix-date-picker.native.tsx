import { CalendarDays } from '@tamagui/lucide-icons'
import moment from 'moment'
import { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { View } from 'tamagui'

import ZixInput from '../zix-input/zix-input'
import { ZixDateFieldProps } from './types'

export const ZixDatePicker: React.FC<ZixDateFieldProps> = ({
  onChange,
  value,
}) => {
  const [startOpen, startOpenChange] = useState(false)
  const size = '$5'
  return (
    <>
      <View position='relative' flex={1}>
        <ZixInput
          flex={1}
          size={size}
          value={value}
          rightIcon={(props) => <CalendarDays {...props} />}
        />
        <View
          position='absolute'
          top={0}
          bottom={0}
          right={0}
          left={0}
          onPress={() => startOpenChange((state) => !state)}
        />
      </View>

      {startOpen && (
        <DateTimePickerModal
          date={moment(value ?? undefined).toDate()}
          isVisible={startOpen}
          mode={'date'}
          onConfirm={(date) => {
            onChange?.(moment(date).format('YYYY-MM-DD'))
            startOpenChange(false)
          }}
          onCancel={() => startOpenChange(false)}
        />
      )}
    </>
  )
}

export default ZixDatePicker
