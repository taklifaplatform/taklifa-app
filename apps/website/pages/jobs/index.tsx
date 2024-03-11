import { JobsListScreen } from '@zix/features/shipments';
import { FindJobsBanner } from 'apps/website/components/jobs/FindJobsBanner';
import { MainLayout } from 'apps/website/layouts/MainLayout';
import { NextPageWithLayout } from '../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <FindJobsBanner />
      <JobsListScreen />
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
