import {
  AuthLayout,
  ChangePasswordScreen,
  guestOnlyGetSSP
} from '@zix/app/features/auth';
import Head from 'next/head';
import { NextPageWithLayout } from '../../_app';

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Change Password</title>
    </Head>
    <ChangePasswordScreen />
  </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = guestOnlyGetSSP();

export default Page;
