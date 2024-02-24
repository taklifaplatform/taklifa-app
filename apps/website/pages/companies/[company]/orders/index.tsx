import { userProtectedGetSSP } from '@zix/features/auth';
import { NextPageWithLayout } from '../../../_app';
import Head from 'next/head';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      {/* <OrdersScreen /> */}
    </>
  );
};

// Page.getLayout = (page) => <YourLayout>{page}</YourLayout>

export const getServerSideProps = userProtectedGetSSP();

export default Page;
