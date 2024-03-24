import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarDays } from '@tamagui/lucide-icons';
import moment from 'moment';
import { useState } from 'react';
import { Button, Sheet, View, YStack } from 'tamagui';

import ZixInput from '../zix-input/zix-input';
import { ZixDateFieldProps } from './types';

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

      <Sheet
        open={startOpen}
        onOpenChange={startOpenChange}
        dismissOnSnapToBottom
        native
        modal
        snapPoints={[60, 70]}
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame>
          <YStack padding='$4' gap='$6'>

            <DateTimePicker
              themeVariant='light'
              textColor='red'
              value={moment(value ?? undefined).toDate()}
              mode={'date'}
              display='inline'
              onChange={(_, date) => {
                onChange?.(moment(date).format('YYYY-MM-DD'))
              }}
            />
            <Button themeInverse onPress={() => startOpenChange(false)}>
              Confirm
            </Button>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}

export default ZixDatePicker
