import Head from 'next/head';
import { NextPageWithLayout } from '../../../../../../_app';
import { userProtectedGetSSP } from '@zix/features/auth';
export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Edit</title>
      </Head>
      {/* <EditScreen /> */}
    </>
  );
};

// Page.getLayout = (page) => <YourLayout>{page}</YourLayout>

export const getServerSideProps = userProtectedGetSSP();

export default Page;
