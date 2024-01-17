import { CreateScreen } from 'app/features/companies/create-screen'
import Head from 'next/head'
import { userProtectedGetSSP } from 'utils/userProtected'
import { NextPageWithLayout } from 'pages/_app'
import { MainLayout } from 'app/features/@main/layout.web'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Company</title>
      </Head>
      <CreateScreen />
    </>
  )
}

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
