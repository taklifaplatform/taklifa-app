import { DashboardLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../_app';
import { NotificationScreen } from '@zix/features/notifications';

export const Page: NextPageWithLayout = () => {
  return (
    <NotificationScreen />
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

// export const getServerSideProps = userProtectedGetSSP();

export default Page;
