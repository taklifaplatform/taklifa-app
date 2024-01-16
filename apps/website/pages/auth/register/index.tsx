import Head from 'next/head';

import {
  AuthLayout,
  SelectAccountTypeScreen,
  guestOnlyGetSSP
} from '@zix/app/features/auth';
import { NextPageWithLayout } from '../../_app';

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Sign up</title>
    </Head>
    <SelectAccountTypeScreen />
  </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = guestOnlyGetSSP();

export default Page;
