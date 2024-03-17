
import { UserProfileScreen } from '@zix/features/users'
import { DashboardLayout } from '@zix/ui/layouts'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return (
    // <AccountScreen />
    <UserProfileScreen />
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)
// export const getServerSideProps = userProtectedGetSSP()

export default Page
