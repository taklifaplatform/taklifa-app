import { AppLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../_app';
import { NotificationScreen } from '@zix/features/notifications';

export const Page: NextPageWithLayout = () => {
  return (
    <NotificationScreen />
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>

// export const getServerSideProps = userProtectedGetSSP();

export default Page;
