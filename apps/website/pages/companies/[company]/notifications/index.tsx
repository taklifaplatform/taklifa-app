import { userProtectedGetSSP } from '@zix/app/features/auth'
import Head from 'next/head'
import { NextPageWithLayout } from '../../../_app'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Notifications</title>
      </Head>
      {/* <NotificationsScreen /> */}
    </>
  )
}

// Page.getLayout = (page) => <YourLayout>{page}</YourLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
