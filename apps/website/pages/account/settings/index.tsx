
import { AccountSettingsLayout, SettingsScreen } from '@zix/features/account'
import { NextPageWithLayout } from '../../_app'
import { MainLayout } from '@zix/ui/layouts'

const Page: NextPageWithLayout = () => {
  return (
    <SettingsScreen />
  )
}

Page.getLayout = (page) => (
  <MainLayout fullPage>
    <AccountSettingsLayout isSettingsHome>{page}</AccountSettingsLayout>
  </MainLayout>
)

// export const getServerSideProps = userProtectedGetSSP()

export default Page
