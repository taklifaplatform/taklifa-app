
import { AccountSettingsLayout, ChangeEmailScreen } from '@zix/features/account'
import { MainLayout } from '@zix/ui/layouts'
import { NextPageWithLayout } from '../../_app'


export const Page: NextPageWithLayout = () => {
  return (
    <ChangeEmailScreen />
  )
}


Page.getLayout = (page) => (
  <MainLayout>
    <AccountSettingsLayout>{page}</AccountSettingsLayout>
  </MainLayout>
)

// export const getServerSideProps = userProtectedGetSSP()

export default Page
