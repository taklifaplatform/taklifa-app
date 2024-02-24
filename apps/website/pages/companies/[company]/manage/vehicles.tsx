import { userProtectedGetSSP } from '@zix/features/auth';
import Head from 'next/head';
import { NextPageWithLayout } from '../../../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Company</title>
      </Head>
      {/* <CompanyScreen /> */}
    </>
  );
};

// Page.getLayout = (page) => <CompanyLayout>{page}</CompanyLayout>

export const getServerSideProps = userProtectedGetSSP();

export default Page;
