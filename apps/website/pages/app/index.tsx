import { HomeScreen } from '@zix/features/customer-dashboard';
import { AppLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <HomeScreen />
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>

export default Page;
