import { userProtectedGetSSP } from '@zix/features/auth';
import Head from 'next/head';

import { NextPageWithLayout } from '../../../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
    </>
  );
};

// Page.getLayout = (page) => <YourLayout>{page}</YourLayout>

export const getServerSideProps = userProtectedGetSSP();

export default Page;
