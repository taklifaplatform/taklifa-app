import { Calendar } from '@tamagui/lucide-icons'
import moment from 'moment'
import { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Button, Input, XGroup } from 'tamagui'

import { ZixDateFieldProps } from './types'

export const ZixDatePicker: React.FC<ZixDateFieldProps> = ({
  onChange,
  value,
}) => {
  const [startOpen, startOpenChange] = useState(false)
  const size = '$5'
  return (
    <>
      <XGroup flex={1}>
        <XGroup.Item>
          <Input
            flex={1}
            size={size}
            value={value}
            onFocus={() => startOpenChange((state) => !state)}
          />
        </XGroup.Item>
        <XGroup.Item>
          <Button
            size={size}
            icon={Calendar}
            onPress={() => startOpenChange((state) => !state)}
            borderColor="$color10"
            borderWidth="$0.25"
            borderLeftWidth={0}
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            backgroundColor="$color2"
          />
        </XGroup.Item>
      </XGroup>
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
