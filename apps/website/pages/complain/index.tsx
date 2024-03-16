import { MainLayout } from 'apps/website/layouts/MainLayout';
import { t } from 'i18next';
import Head from 'next/head';
import { NextPageWithLayout } from '../_app';
import { ComplainScreen } from '@zix/features/support';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{t('web-home:complaint')}</title>
      </Head>

      <ComplainScreen />
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
