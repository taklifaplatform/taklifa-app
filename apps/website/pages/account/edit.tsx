
import Head from 'next/head'

import { NextPageWithLayout } from '../_app'
import { AccountSettingsLayout, EditAccountScreen } from '@zix/features/account'
import { MainLayout } from '@zix/features/main'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Edit Account</title>
      </Head>
      <EditAccountScreen />
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
