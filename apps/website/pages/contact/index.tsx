
import { MainLayout } from 'apps/website/layouts/main-layout';
import { t } from 'i18next';
import Head from 'next/head';
import { NextPageWithLayout } from '../_app';
import { ContactScreen } from '@zix/features/support';

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
