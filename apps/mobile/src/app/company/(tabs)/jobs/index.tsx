import { JobsListScreen } from '@zix/features/shipments';
import { AppHeader } from '@zix/ui/layouts';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader title="Jobs" headerBackgroundColor="transparent" />
      <JobsListScreen urlPrefix='company/jobs' />
    </>
  );
}
