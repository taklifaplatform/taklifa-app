import { UpdateDriverScreen } from '@zix/app/features/companies-dashboard';
import { AppHeader } from '@zix/app/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Edit" />
      <UpdateDriverScreen />
    </>
  );
}
