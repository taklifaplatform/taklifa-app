import { ChevronDown } from '@tamagui/lucide-icons';
import { YStack, Text, XStack, Accordion, Paragraph, Square } from 'tamagui';

export function DriverTap() {
  const workTimeData = [
    {
      id: 6,
      day: 'Saturday',
      time: '9:00 AM - 5:00 PM'
    },
    {
      id: 7,
      day: 'Sunday',
      time: '9:00 AM - 5:00 PM'
    },
    {
      id: 1,
      day: 'Monday',
      time: '9:00 AM - 5:00 PM'
    },
    {
      id: 2,
      day: 'Tuesday',
      time: '9:00 AM - 5:00 PM'
    },
    {
      id: 3,
      day: 'Wednesday',
      time: '9:00 AM - 5:00 PM'
    },
    {
      id: 4,
      day: 'Thursday',
      time: '9:00 AM - 5:00 PM'
    },
    {
      id: 5,
      day: 'Friday',
      time: '9:00 AM - 5:00 PM',
      work: true
    }
  ];
  return (
    <YStack flex={1} width={'100%'}>
      <Accordion overflow="hidden" width="100%" type="multiple">
        <Accordion.Item value="a1">
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({ open }) => (
              <>
                <Text fontSize={'$3'} fontWeight={'700'}>
                  About Driver
                </Text>
                <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <Paragraph>
              This text is an example of text that can be replaced in the same
              space. This text was generated from the Arabic text generator,
              where you can generate such text or many other texts in addition
              to increasing the number of letters that the application
              generates.
            </Paragraph>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="a2">
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({ open }) => (
              <>
                <Text fontSize={'$3'} fontWeight={'700'}>
                  Work Time
                </Text>
                <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            {workTimeData.map((item, index) => (
              <XStack
                backgroundColor={item.work ? '#FFECEB' : '$gray4'}
                padding="$2"
                borderRadius="$2"
                space="$4"
                marginBottom="$2"
              >
                <Text
                  fontSize={'$2'}
                  fontWeight="bold"
                  paddingRight="$2"
                  width={'30%'}
                >
                  {item.day}
                </Text>
                <Text fontSize={'$2'}>{item.time}</Text>
              </XStack>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </YStack>
  );
}
