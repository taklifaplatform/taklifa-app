import Head from 'next/head'
import { NextPageWithLayout } from '../../../_app'
import { userProtectedGetSSP } from '@zix/app/features/auth'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      {/* <OrdersScreen /> */}
    </>
  )
}

// Page.getLayout = (page) => <YourLayout>{page}</YourLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
