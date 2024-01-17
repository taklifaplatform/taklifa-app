// import { CompaniesScreen } from 'app/features/companies/companies-screen'
import Head from 'next/head'
import { userProtectedGetSSP } from 'utils/userProtected'
import { NextPageWithLayout } from 'pages/_app'
import { MainLayout } from 'app/features/@main/layout.web'

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

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
