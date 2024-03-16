import { ContactScreen } from '@zix/features/contact-us';
import { MainLayout } from 'apps/website/layouts/MainLayout';
import { t } from 'i18next';
import Head from 'next/head';
import { NextPageWithLayout } from '../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{t('web-home:call')}</title>
      </Head>

      <ContactScreen />
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
