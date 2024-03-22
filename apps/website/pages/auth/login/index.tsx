import { AuthLayout, LoginScreen, guestOnlyGetSSP } from '@zix/features/auth';
import Head from 'next/head';
import { NextPageWithLayout } from '../../_app';

export const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Sign in</title>
    </Head>
    <LoginScreen />
  </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = guestOnlyGetSSP();

export default Page;
