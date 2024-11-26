import { useAuth } from '@zix/services/auth';
import React, { useEffect } from 'react';
import { registerForPushNotificationsAsync } from './registerForPushNotificationsAsync';
import { NotificationService } from '@zix/api';
import * as Notifications from 'expo-notifications';
import { useNotification } from '@zix/services/push-notification';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export type PushNotificationProps = {
  children: React.ReactNode;
};

export const PushNotification: React.FC<PushNotificationProps> = ({
  children,
}) => {
  const { authAccessToken } = useAuth();
  const { handleNotificationRedirection } = useNotification()


  async function registerPushNotificationToken() {
    if (!authAccessToken) {
      return;
    }
    const token = await registerForPushNotificationsAsync();

    if (token) {
      NotificationService.storeExpoToken({
        requestBody: {
          token,
        },
      });
    }
  }

  useEffect(() => {
    registerPushNotificationToken();

    Notifications.addNotificationResponseReceivedListener(response => {
      handleNotificationRedirection(response.notification.request.content.data);
    });
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) {
        handleNotificationRedirection(response.notification.request.content.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authAccessToken]);
  return children;
};

export default PushNotification;
