import { InviteScreen } from 'app/features/companies/invite-screen'
import Head from 'next/head'
import { userProtectedGetSSP } from 'utils/userProtected'
import { NextPageWithLayout } from 'pages/_app'
import { CompanyLayout } from 'app/features/companies/layout.web'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Invite Driver</title>
      </Head>
      <InviteScreen />
    </>
  )
}

Page.getLayout = (page) => <CompanyLayout>{page}</CompanyLayout>

export const getServerSideProps = userProtectedGetSSP()

export default Page
