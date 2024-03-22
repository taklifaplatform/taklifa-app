import { ShipmentDetailScreen } from '@zix/features/shipments';
import { AppLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../../../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <ShipmentDetailScreen variant='jobs' />
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Page;
