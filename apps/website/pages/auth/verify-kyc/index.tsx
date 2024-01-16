import {
  AuthLayout,
  KycVerificationScreen,
  userProtectedGetSSP
} from '@zix/app/features/auth';
import Head from 'next/head';
import { NextPageWithLayout } from '../../_app';

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Verify KYC</title>
    </Head>
    <KycVerificationScreen />
  </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = userProtectedGetSSP();

export default Page;
