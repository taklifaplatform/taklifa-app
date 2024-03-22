import { HomeScreen } from '@zix/features/customer-dashboard';
import { DashboardLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <HomeScreen />
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page;
