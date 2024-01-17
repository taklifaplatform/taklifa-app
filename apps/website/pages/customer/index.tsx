import { CustomerHomeScreen } from 'app/features/customer/screens/customer-home-screen'
import { CustomerLayout } from 'app/features/customer/layout.web'
import Head from 'next/head'
import { NextPageWithLayout } from 'pages/_app'
import { guestAndUsersGetSSP } from 'utils/guestAndUsers'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Sawaeed Logistic</title>
      </Head>
      <CustomerHomeScreen />
    </>
  )
}

Page.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>

export const getServerSideProps = guestAndUsersGetSSP()

export default Page
