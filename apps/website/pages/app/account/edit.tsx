

import { AccountSettingsLayout, EditAccountScreen } from '@zix/features/account'
import { AppLayout } from '@zix/ui/layouts'
import { NextPageWithLayout } from '../../_app'

export const Page: NextPageWithLayout = () => {
  return (
    <EditAccountScreen />
  )
}

Page.getLayout = (page) => (
  <AppLayout>
    <AccountSettingsLayout isSettingsHome>{page}</AccountSettingsLayout>
  </AppLayout>
)
// export const getServerSideProps = userProtectedGetSSP()

export default Page
