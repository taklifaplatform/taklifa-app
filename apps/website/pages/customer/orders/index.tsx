

import { Text } from 'tamagui';
import { NextPageWithLayout } from '../../_app';
import MainLayout from 'apps/website/layouts/MainLayout';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Text>orderds</Text>
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;