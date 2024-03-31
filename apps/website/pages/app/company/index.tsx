import { ManageCompanyDataScreen } from '@zix/features/company';
import { AppLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <ManageCompanyDataScreen />
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Page;
