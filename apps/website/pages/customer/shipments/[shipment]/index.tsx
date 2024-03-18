import { ShipmentDetailScreen } from '@zix/features/shipments';
import { DashboardLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../../../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <ShipmentDetailScreen variant='shipments' />
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page;
