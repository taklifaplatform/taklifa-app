import {
  ManageTeamScreen
} from '@zix/features/companies-dashboard';
import { AppHeader } from '@zix/ui/layouts';
import { DashboardLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <AppHeader
        showBackButton
        title="Manage Team"
      />
      <ManageTeamScreen />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page;
