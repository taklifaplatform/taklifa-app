
import { useAuth } from '@zix/utils';
import React, { useEffect } from 'react';
import { registerForPushNotificationsAsync } from './registerForPushNotificationsAsync';
import { NotificationService } from '@zix/api';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export type PushNotificationProps = {
  children: React.ReactNode;
}

export const PushNotification: React.FC<PushNotificationProps> = ({
  children
}) => {
  const { authAccessToken } = useAuth()

  async function registerPushNotificationToken() {
    const token = await registerForPushNotificationsAsync()

    if (token && authAccessToken) {
      NotificationService.storeExpoToken({
        requestBody: {
          token
        }
      })
    }
  }

  useEffect(() => {
    registerPushNotificationToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authAccessToken])
  return children;
}


export default PushNotification;
