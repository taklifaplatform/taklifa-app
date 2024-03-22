
import { UserProfileScreen } from '@zix/features/users'
import { AppLayout } from '@zix/ui/layouts'
import { NextPageWithLayout } from '../../_app'

export const Page: NextPageWithLayout = () => {
  return (
    // <AccountScreen />
    <UserProfileScreen />
  )
}

Page.getLayout = (page) => (
  <AppLayout>
    {page}
  </AppLayout>
)
// export const getServerSideProps = userProtectedGetSSP()

export default Page
