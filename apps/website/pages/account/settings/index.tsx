
import { AccountSettingsLayout, SettingsScreen } from '@zix/features/account'
import { NextPageWithLayout } from '../../_app'
import { MainLayout } from '@zix/ui/layouts'

export const Page: NextPageWithLayout = () => {
  return (
    <SettingsScreen />
  )
}

Page.getLayout = (page) => (
  <MainLayout>
    <AccountSettingsLayout isSettingsHome>{page}</AccountSettingsLayout>
  </MainLayout>
)

// export const getServerSideProps = userProtectedGetSSP()

export default Page
