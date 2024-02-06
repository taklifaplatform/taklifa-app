// import { CompaniesScreen } from 'app/features/companies/companies-screen'
import Head from 'next/head'

import { userProtectedGetSSP } from '@zix/app/features/auth'
import { NextPageWithLayout } from '../_app'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Companies</title>
      </Head>
      {/* <CompaniesScreen /> */}
    </>
  )
}

// Page.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
