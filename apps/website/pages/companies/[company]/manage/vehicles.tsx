import { CompanyScreen } from 'app/features/companies/company-screen'
import { CompanyLayout } from 'app/features/companies/layout.web'

import Head from 'next/head'
import { NextPageWithLayout } from 'pages/_app'
import { userProtectedGetSSP } from 'utils/userProtected'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Company</title>
      </Head>
      <CompanyScreen />
    </>
  )
}

Page.getLayout = (page) => <CompanyLayout>{page}</CompanyLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
