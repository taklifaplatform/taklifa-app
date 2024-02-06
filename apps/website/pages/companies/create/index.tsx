import { userProtectedGetSSP } from '@zix/app/features/auth'
import Head from 'next/head'
import { NextPageWithLayout } from '../../_app'
export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Company</title>
      </Head>
      {/* <CreateScreen /> */}
    </>
  )
}

// Page.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
