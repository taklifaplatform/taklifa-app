import { ManageTeamScreen } from '@zix/features/company';
import { AppHeader } from '@zix/ui/layouts';
import { AppLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <AppHeader showBackButton title="Manage Team" />
      <ManageTeamScreen />
    </>
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Page;
