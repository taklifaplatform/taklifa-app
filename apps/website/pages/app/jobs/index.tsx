import { ShipmentsListScreen } from '@zix/features/shipments';

import { AppLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <ShipmentsListScreen variant='jobs' />
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Page;
