import { OrdersScreen } from 'app/features/companies/orders-screen'
import Head from 'next/head'
import { userProtectedGetSSP } from 'utils/userProtected'
import { NextPageWithLayout } from 'pages/_app'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <OrdersScreen />
    </>
  )
}

// Page.getLayout = (page) => <YourLayout>{page}</YourLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
