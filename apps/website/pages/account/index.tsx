import Head from 'next/head'

import { NextPageWithLayout } from '../_app'
import { MainLayout } from '@zix/features/main'
import { AccountScreen, AccountSettingsLayout } from '@zix/features/account'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <AccountScreen />
    </>
  )
}

Page.getLayout = (page) => (
  <MainLayout fullPage>
    <AccountSettingsLayout isSettingsHome>{page}</AccountSettingsLayout>
  </MainLayout>
)
// export const getServerSideProps = userProtectedGetSSP()

export default Page
