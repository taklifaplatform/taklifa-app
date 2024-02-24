import Head from 'next/head';

import {
  AuthLayout,
  ResetPasswordVerifyPhoneNumberScreen,
  guestOnlyGetSSP,
} from '@zix/features/auth';
import { NextPageWithLayout } from '../../_app';

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Verify Phone Number</title>
    </Head>
    <ResetPasswordVerifyPhoneNumberScreen />
  </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = guestOnlyGetSSP();

export default Page;
