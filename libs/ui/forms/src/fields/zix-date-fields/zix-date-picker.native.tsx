import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarDays } from '@tamagui/lucide-icons';
import moment from 'moment-timezone';
import { useState } from 'react';
import { Button, Sheet, View, YStack } from 'tamagui';

import ZixInput from '../zix-input/zix-input';
import { ZixDateFieldProps } from './types';
import { Platform } from 'react-native';

export const ZixDatePicker: React.FC<ZixDateFieldProps> = ({
  onChange,
  value,
}) => {
  const [startOpen, startOpenChange] = useState(false);
  const size = '$5';

  const localTZ = moment.tz.guess();
  const apiTZ = 'UTC';

  const formatDateToUTC = (date: Date | undefined) => {
    if (!date) return '';
    // Convert local date to UTC while preserving the local time
    return moment(date)
      .tz(localTZ)
      .startOf('day')
      .tz(apiTZ, true)
      .format('YYYY-MM-DD');
  };

  const getDisplayDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    // Convert UTC date to local while preserving the time
    return moment.tz(dateStr, apiTZ)
      .tz(localTZ, true)
      .format('YYYY-MM-DD');
  };

  const getPickerDate = (dateStr: string | undefined) => {
    if (!dateStr) return new Date();
    // Convert UTC date to local for picker display
    return moment.tz(dateStr, apiTZ)
      .tz(localTZ, true)
      .toDate();
  };

  const renderIosDatePicker = () => (
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
            value={getPickerDate(value)}
            mode={'date'}
            display='inline'
            onChange={(_, date) => {
              const formattedDate = formatDateToUTC(date);
              if (formattedDate) {
                onChange?.(formattedDate);
              }
            }}
          />
          <Button themeInverse onPress={() => {
            if (!value) {
              const formattedDate = formatDateToUTC(new Date());
              if (formattedDate) {
                onChange?.(formattedDate);
              }
            }
            startOpenChange(false)
          }}>
            Confirm
          </Button>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )

  const renderAndroidDatePicker = () => !!startOpen && (
    <DateTimePicker
      themeVariant='light'
      textColor='red'
      value={getPickerDate(value)}
      mode={'date'}
      display='inline'
      onChange={(_, date) => {
        startOpenChange(() => {
          const formattedDate = formatDateToUTC(date);
          if (formattedDate) {
            onChange?.(formattedDate);
          }
          return false;
        })
      }}
    />
  )

  return (
    <>
      <View position='relative' flex={1}>
        <ZixInput
          flex={1}
          size={size}
          value={getDisplayDate(value)}
          leftIcon={(props) => <CalendarDays {...props} />}
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

      {
        Platform.OS === 'ios' && renderIosDatePicker()
      }
      {
        Platform.OS === 'android' && renderAndroidDatePicker()
      }
    </>
  )
}

export default ZixDatePicker
