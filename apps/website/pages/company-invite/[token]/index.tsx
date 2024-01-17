import { AuthLayout } from 'app/features/auth/layout.web'
import { TokenScreen } from 'app/features/companies/company-invite/token-screen'
import Head from 'next/head'
import { NextPageWithLayout } from 'pages/_app'
import { guestAndUsersGetSSP } from 'utils/guestAndUsers'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Company Invitation</title>
      </Head>
      <TokenScreen />
    </>
  )
}

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>

export const getServerSideProps = guestAndUsersGetSSP()

export default Page
