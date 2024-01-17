import { SettingsScreen } from '@zix/app/features/account';
import { AppHeader } from '@zix/app/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Settings" />
      <SettingsScreen />
    </>
  );
}
