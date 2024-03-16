import { NotificationScreen } from '@zix/features/notifications';
import { AppHeader } from '@zix/ui/layouts';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader
        showBackButton
        title="Notifications"
        headerBackgroundColor="transparent"
      />
      <NotificationScreen />
    </>
  );
}
