import Head from 'next/head';
import { NextPageWithLayout } from './_app';
import { TermsOfServiceScreen } from '@zix/features/auth';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Terms of Service</title>
      </Head>
      <TermsOfServiceScreen />
    </>
  );
};

// Page.getLayout = (page) => <LegalLayout>{page}</LegalLayout>

export default Page;
