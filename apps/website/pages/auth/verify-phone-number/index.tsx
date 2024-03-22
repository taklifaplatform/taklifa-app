import { AuthLayout, guestAndUsersGetSSP } from '@zix/features/auth';
import Head from 'next/head';
import { NextPageWithLayout } from '../../_app';

export const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Verify Phone Number</title>
    </Head>
  </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = guestAndUsersGetSSP();

export default Page;
