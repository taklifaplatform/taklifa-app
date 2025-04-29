import DateTimePicker from '@react-native-community/datetimepicker';
import { Clock } from '@tamagui/lucide-icons';
import moment from 'moment';
import { useState } from 'react';
import { Button, Sheet, View, YStack } from 'tamagui';
import { t } from 'i18next';
import ZixInput from '../zix-input/zix-input';
import { ZixDateFieldProps } from './types';

export const ZixTimePicker: React.FC<ZixDateFieldProps> = ({
  onChange,
  value,
}) => {
  const [startOpen, startOpenChange] = useState(false)
  const size = '$5'
  const getFormattedTime = (val) => val ? moment(val, 'HH:mm').format('hh:mm A')
    : moment().format('hh:mm A')
  return (
    <>
      <View position='relative' flex={1}>
        <ZixInput
          flex={1}
          size={size}
          value={getFormattedTime(value)}
          rightIcon={(props) => <Clock {...props} />}
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
        snapPoints={[40, 50]}
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame>
          <YStack padding='$4' gap='$6'>

            <DateTimePicker
              themeVariant='light'
              value={
                value ? moment(value, 'HH:mm').toDate()
                  : moment().toDate()
              }
              mode={'time'}
              display='spinner'
              onChange={(_, date) => {
                onChange?.(moment(date).format('HH:mm'))
              }}
            />
            <Button themeInverse onPress={() => startOpenChange(false)}>
               {t('common:confirm')}
            </Button>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}

export default ZixTimePicker
