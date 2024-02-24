import Head from 'next/head';
import { NextPageWithLayout } from '../../../../../_app';
import { userProtectedGetSSP } from '@zix/features/auth';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Invite Driver</title>
      </Head>
      {/* <InviteScreen /> */}
    </>
  );
};

// Page.getLayout = (page) => <CompanyLayout>{page}</CompanyLayout>

export const getServerSideProps = userProtectedGetSSP();

export default Page;
