import { NotificationsScreen } from 'app/features/companies/notifications-screen'
import Head from 'next/head'
import { userProtectedGetSSP } from 'utils/userProtected'
import { NextPageWithLayout } from 'pages/_app'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Notifications</title>
      </Head>
      <NotificationsScreen />
    </>
  )
}

// Page.getLayout = (page) => <YourLayout>{page}</YourLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
