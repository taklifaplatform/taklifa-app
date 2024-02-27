import { MainLayout } from 'apps/website/layouts/MainLayout';
import { NextPageWithLayout } from '../_app';
import { Text } from 'tamagui';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Text>Jobs</Text>
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;