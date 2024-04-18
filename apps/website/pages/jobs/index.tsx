import { JobsListScreen } from '@zix/features/shipments';
import { FindJobsBanner } from 'apps/website/components/jobs/find-jobs-banner';
import { MainLayout } from 'apps/website/layouts/main-layout';
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
