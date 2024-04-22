import { MainLayout } from '../../../layouts/main-layout';
import { NextPageWithLayout } from '../../_app';
import { JobDetailsScreen } from '@zix/features/shipments';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <JobDetailsScreen />
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
