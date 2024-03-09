
import React from 'react';

import { Text, XStack, YStack } from 'tamagui';

const workTimeData = [
  {
    id: 6,
    day: 'Saturday',
    time: '9:00 AM - 5:00 PM',
  },
  {
    id: 7,
    day: 'Sunday',
    time: '9:00 AM - 5:00 PM',
  },
  {
    id: 1,
    day: 'Monday',
    time: '9:00 AM - 5:00 PM',
  },
  {
    id: 2,
    day: 'Tuesday',
    time: '9:00 AM - 5:00 PM',
  },
  {
    id: 3,
    day: 'Wednesday',
    time: '9:00 AM - 5:00 PM',
  },
  {
    id: 4,
    day: 'Thursday',
    time: '9:00 AM - 5:00 PM',
  },
  {
    id: 5,
    day: 'Friday',
    time: '9:00 AM - 5:00 PM',
    work: true,
  },
];

/* eslint-disable-next-line */
export type ZixWorkingHoursWidgetProps = {
}


export const ZixWorkingHoursWidget: React.FC<ZixWorkingHoursWidgetProps> = (props) => {
  return (
    <YStack gap='$2'>
      {workTimeData.map((item, index) => (
        <XStack
          key={index}
          backgroundColor={item.work ? '$red4' : '$gray4'}
          padding="$2"
          borderRadius="$1"
          gap="$4"
        >
          <Text
            fontSize={'$2'}
            fontWeight="bold"
            paddingRight="$2"
            width={100}
          >
            {item.day}
          </Text>
          <Text fontSize={'$2'}>{item.time}</Text>
        </XStack>
      ))}
    </YStack>
  );
}


export default ZixWorkingHoursWidget;
