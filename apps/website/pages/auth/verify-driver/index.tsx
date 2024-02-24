import {
  AuthDriverVerificationScreen,
  AuthLayout,
  userProtectedGetSSP,
} from '@zix/features/auth';
import Head from 'next/head';
import { NextPageWithLayout } from '../../_app';

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Verify Driver</title>
    </Head>
    <AuthDriverVerificationScreen />
  </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = userProtectedGetSSP();

export default Page;
