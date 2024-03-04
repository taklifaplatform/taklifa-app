import { JobsListScreen } from '@zix/features/jobs';
import { ManageJobs } from 'apps/website/components/jobs/ManageJobs';
import { MainLayout } from 'apps/website/layouts/MainLayout';
import { NextPageWithLayout } from '../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <ManageJobs />
      <JobsListScreen />
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;