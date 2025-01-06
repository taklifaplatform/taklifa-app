import { NotificationTransformer } from '@zix/api';
import { useNotification } from '@zix/services/push-notification';
import { UserAvatar, ZixAvatar } from '@zix/ui/common';
import moment from 'moment';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';


export type NotificationCardProps = {
  notification: NotificationTransformer
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  const { handleNotificationRedirection } = useNotification()
  function onPress() {
    handleNotificationRedirection(notification.data)
  }


  return (
    <TouchableOpacity onPress={onPress}>
      <XStack
        backgroundColor={notification.read_at ? 'transparent' : '$color3'}
        paddingHorizontal='$4'
        paddingVertical='$3'
        borderBottomWidth={1}
        borderColor='$color5'
      >
        <XStack gap='$2' flex={1} alignItems='center'>
          {
            notification?.sender?.id ? (
              <UserAvatar
                user={notification.sender}
                size='$3'
              />
            ) : (
              <ZixAvatar
                media={notification.data?.image}
                name={notification.data?.title}
                size='$3'
              />
            )
          }

          <YStack gap='$1'>
            <Text fontWeight='700'>{notification.data?.title}</Text>
            <Text color='$color10'>{notification.data?.description}</Text>
          </YStack>
        </XStack>
        <YStack>
          <Text color='$color10'>{moment(notification.created_at).fromNow()}</Text>
        </YStack>
      </XStack>
    </TouchableOpacity>
  )
}


export default NotificationCard
