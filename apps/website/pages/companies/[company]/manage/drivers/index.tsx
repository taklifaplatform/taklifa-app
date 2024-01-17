import { CompanyManageDriversScreen } from 'app/features/companies/manage/drivers-screen'
import { CompanyLayout } from 'app/features/companies/layout.web'

import Head from 'next/head'
import { NextPageWithLayout } from 'pages/_app'
import { userProtectedGetSSP } from 'utils/userProtected'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Manage Drivers</title>
      </Head>
      <CompanyManageDriversScreen />
    </>
  )
}

Page.getLayout = (page) => <CompanyLayout>{page}</CompanyLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
