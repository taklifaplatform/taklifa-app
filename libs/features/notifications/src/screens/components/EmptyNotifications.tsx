import { YStack, Text } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';

export default function empty_notifications() {
  return (
    <YStack
      flex={1}
      backgroundColor={'#FAFAFA'}
      gap="$4"
      alignItems="center"
      justifyContent="center"
    >
      <CustomIcon name="empty_notification" size="$20" color={'#757575'} />
      <Text fontSize={'$3'} fontWeight={'700'}>
        No Notifications
      </Text>
      <Text fontSize={'$3'} fontWeight={'500'} color={'#757575'}>
        You currently have no notifications
      </Text>
    </YStack>
  );
}
