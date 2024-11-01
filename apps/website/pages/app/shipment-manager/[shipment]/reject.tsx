import { ShipmentRejectScreen } from '@zix/features/shipments';
import { AppLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../../../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <ShipmentRejectScreen variant='shipments' />
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Page;
