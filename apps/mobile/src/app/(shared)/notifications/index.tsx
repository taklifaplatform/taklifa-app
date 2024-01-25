import { NotificationScreen } from '@zix/app/features/notification';
import { AppHeader } from '@zix/app/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Notifications" />
      <NotificationScreen />
    </>
  );
}
