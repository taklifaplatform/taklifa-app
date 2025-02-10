import { ManageShipmentSenderScreen } from '@zix/features/shipments';
import { AppLayout } from '@zix/ui/layouts';
import React from 'react';
import { NextPageWithLayout } from '../../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <ManageShipmentSenderScreen variant='shipments' />
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Page;
