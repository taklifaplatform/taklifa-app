
import Head from 'next/head'
import { NextPageWithLayout } from '../../_app'
import { AccountSettingsLayout, SettingsScreen } from '@zix/features/account'
import { MainLayout } from '@zix/features/main'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <SettingsScreen />
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
