import { MainLayout } from 'apps/website/layouts/main-layout';
import { NextPageWithLayout } from '../_app';
import { Text } from 'tamagui';
import { PrivacyPolicyScreen } from '@zix/features/auth';
import Head from 'next/head';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <PrivacyPolicyScreen />
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
