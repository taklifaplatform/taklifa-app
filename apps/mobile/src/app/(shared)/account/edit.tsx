import { EditAccountScreen } from '@zix/features/account';
import { AppHeader } from '@zix/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Edit Profile" />
      <EditAccountScreen />
    </>
  );
}
