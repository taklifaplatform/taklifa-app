
import Head from 'next/head'
import { NextPageWithLayout } from './_app'
import { PrivacyPolicyScreen } from '@zix/app/features/auth'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <PrivacyPolicyScreen />
    </>
  )
}

// Page.getLayout = (page) => <LegalLayout>{page}</LegalLayout>

export default Page
