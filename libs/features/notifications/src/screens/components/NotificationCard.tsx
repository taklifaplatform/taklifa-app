import { NotificationTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import moment from 'moment';
import React from 'react';
import { ListItem, View } from 'tamagui';


export type NotificationCardProps = {
  notification: NotificationTransformer
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {

  return (
    <ListItem
      backgroundColor={notification.read_at ? 'transparent' : '$color3'}
      title={notification.data?.title}
      subTitle={moment(notification.created_at).fromNow()}

      icon={notification.sender ? (
        <UserAvatar
          user={notification.sender}
          size="$3"
        />
      ) : (
        <View
          width="$3"
          height="$3"
          borderRadius="$10"
          alignItems='center'
          justifyContent='center'
          backgroundColor="$color2"
        >
          <CustomIcon name={notification.data?.icon} size="$1.5" color='$color5' />
        </View>
      )}
    />
  )
}


export default NotificationCard
