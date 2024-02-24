import {
  AuthLayout,
  ResetPasswordScreen,
  guestOnlyGetSSP,
} from '@zix/features/auth';
import Head from 'next/head';
import { NextPageWithLayout } from '../../_app';

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Reset Password</title>
    </Head>
    <ResetPasswordScreen />
  </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = guestOnlyGetSSP();

export default Page;
