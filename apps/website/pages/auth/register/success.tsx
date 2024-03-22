import {
  AuthLayout,
  SignUpSuccessScreen,
  userProtectedGetSSP,
} from '@zix/features/auth';
import Head from 'next/head';
import { NextPageWithLayout } from '../../_app';

export const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Register Request</title>
    </Head>
    <SignUpSuccessScreen />
  </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = userProtectedGetSSP();

export default Page;
