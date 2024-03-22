import { ShipmentsListScreen } from '@zix/features/shipments';
import React from 'react';

export default function Screen() {
  return (
    <ShipmentsListScreen variant='jobs' />

    // <>
    //   <AppHeader title="Jobs"  />
    //   <JobsListScreen urlPrefix='company/jobs' />
    // </>
  );
}
