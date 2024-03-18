import Head from 'next/head';
import { MainLayout } from '../../layouts/MainLayout';
import { NextPageWithLayout } from '../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Faqs</title>
      </Head>
      
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;