import { userProtectedGetSSP } from '@zix/app/features/auth'
import Head from 'next/head'
import { NextPageWithLayout } from '../../../../_app'


export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Manage Drivers</title>
      </Head>
      {/* <CompanyManageDriversScreen /> */}
    </>
  )
}

// Page.getLayout = (page) => <CompanyLayout>{page}</CompanyLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
