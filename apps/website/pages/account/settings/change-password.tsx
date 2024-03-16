
import { AccountSettingsLayout } from '@zix/features/account'
import { ChangePasswordScreen } from '@zix/features/auth'
import { MainLayout } from '@zix/ui/layouts'
import { NextPageWithLayout } from '../../_app'


const Page: NextPageWithLayout = () => {
  return (
    <ChangePasswordScreen />
  )
}

Page.getLayout = (page) => (
  <MainLayout fullPage>
    <AccountSettingsLayout>{page}</AccountSettingsLayout>
  </MainLayout>
)

// export const getServerSideProps = userProtectedGetSSP()

export default Page
