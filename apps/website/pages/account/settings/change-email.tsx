
import Head from 'next/head'
import { NextPageWithLayout } from '../../_app'
import { AccountSettingsLayout, ChangeEmailScreen } from '@zix/features/account'
import { MainLayout } from '@zix/features/main'


const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Change Email</title>
      </Head>
      <ChangeEmailScreen />
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
