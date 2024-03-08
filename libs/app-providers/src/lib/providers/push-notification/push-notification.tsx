import React from 'react';

export type PushNotificationProps = {
  children: React.ReactNode;
}

export const PushNotification: React.FC<PushNotificationProps> = ({
  children
}) => {
  return children;
}


export default PushNotification;
