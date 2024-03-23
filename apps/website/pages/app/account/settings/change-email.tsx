
import { AccountSettingsLayout, ChangeEmailScreen } from '@zix/features/account'
import { AppLayout } from '@zix/ui/layouts'
import { NextPageWithLayout } from '../../../_app'


export const Page: NextPageWithLayout = () => {
  return (
    <ChangeEmailScreen />
  )
}


Page.getLayout = (page) => (
  <AppLayout>
    <AccountSettingsLayout>{page}</AccountSettingsLayout>
  </AppLayout>
)

// export const getServerSideProps = userProtectedGetSSP()

export default Page
