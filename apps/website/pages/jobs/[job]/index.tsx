import { MainLayout } from 'apps/website/layouts/MainLayout';
import { NextPageWithLayout } from '../_app';
import { JobDetailsScreen } from '@zix/features/jobs'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <JobDetailsScreen />
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;