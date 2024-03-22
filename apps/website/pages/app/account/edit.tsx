

import { EditAccountScreen } from '@zix/features/account'
import { DashboardLayout } from '@zix/ui/layouts'
import { NextPageWithLayout } from '../../_app'

export const Page: NextPageWithLayout = () => {
  return (
    <EditAccountScreen />
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
)
// export const getServerSideProps = userProtectedGetSSP()

export default Page
