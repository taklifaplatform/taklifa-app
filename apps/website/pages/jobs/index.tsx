import { MainLayout } from 'apps/website/layouts/MainLayout';
import { NextPageWithLayout } from '../_app';
import { Text } from 'tamagui';
import { JobsListScreen } from '@zix/features/jobs';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Text>Jobs</Text>
      <JobsListScreen />
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;