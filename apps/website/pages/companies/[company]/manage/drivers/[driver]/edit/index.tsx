import { EditScreen } from 'app/features/companies/edit-screen'
import Head from 'next/head'
import { userProtectedGetSSP } from 'utils/userProtected'
import { NextPageWithLayout } from 'pages/_app'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Edit</title>
      </Head>
      <EditScreen />
    </>
  )
}

// Page.getLayout = (page) => <YourLayout>{page}</YourLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
