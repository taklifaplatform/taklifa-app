import { t } from 'i18next';
import Head from 'next/head';

import { AuthLayout, SignUpScreen, guestOnlyGetSSP } from '@zix/features/auth';
import { NextPageWithLayout } from '../../_app';

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{t('auth:create_new_account')}</title>
    </Head>
    <SignUpScreen />
  </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = guestOnlyGetSSP();

export default Page;
