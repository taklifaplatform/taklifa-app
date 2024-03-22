import Head from 'next/head';

import {
  AuthLayout,
  SelectUserTypeScreen,
  guestOnlyGetSSP,
} from '@zix/features/auth';
import { NextPageWithLayout } from '../../_app';

export const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Sign up</title>
    </Head>
    <SelectUserTypeScreen />
  </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = guestOnlyGetSSP();

export default Page;
