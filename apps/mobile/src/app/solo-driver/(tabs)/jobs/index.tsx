import { JobsListScreen } from '@zix/features/shipments';
import { AppHeader } from '@zix/ui/common';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader title="Jobs" headerBackgroundColor="transparent" />
      <JobsListScreen urlPrefix='solo-driver/jobs' />
    </>
  );
}
