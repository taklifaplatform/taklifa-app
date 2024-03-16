
import Head from 'next/head'
import { NextPageWithLayout } from '../../_app'
import { ChangePasswordScreen } from '@zix/features/auth'
import { MainLayout } from '@zix/features/main'
import { AccountSettingsLayout } from '@zix/features/account'


const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      <ChangePasswordScreen />
    </>
  )
}

Page.getLayout = (page) => (
  <MainLayout fullPage>
    <AccountSettingsLayout>{page}</AccountSettingsLayout>
  </MainLayout>
)

// export const getServerSideProps = userProtectedGetSSP()

export default Page
