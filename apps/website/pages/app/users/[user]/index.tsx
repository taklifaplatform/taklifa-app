import { UserProfileScreen } from '@zix/features/users';
import { DashboardLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <UserProfileScreen />
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

// export const getServerSideProps = userProtectedGetSSP();

export default Page;
