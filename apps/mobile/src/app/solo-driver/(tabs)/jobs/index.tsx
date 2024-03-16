import { ShipmentsListScreen } from '@zix/features/shipments';
import React from 'react';

export default function Screen() {
  return (
    <ShipmentsListScreen urlPrefix='/solo-driver/jobs' />

    // <>
    //   <AppHeader title="Jobs" headerBackgroundColor="transparent" />
    //   <JobsListScreen urlPrefix='solo-driver/jobs' />
    // </>
  );
}
