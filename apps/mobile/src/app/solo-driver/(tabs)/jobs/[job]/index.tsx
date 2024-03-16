import { JobDetailsScreen } from '@zix/features/solo-driver-dashboard';
import { AppHeader } from '@zix/ui/layouts';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Job Detail" />
      <JobDetailsScreen />
    </>
  );
}
