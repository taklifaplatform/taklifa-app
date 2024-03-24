
import { ChangePasswordScreen } from '@zix/features/account'
import { AppLayout } from '@zix/ui/layouts'
import { NextPageWithLayout } from '../../../_app'


export const Page: NextPageWithLayout = () => {
  return (
    <ChangePasswordScreen />
  )
}

Page.getLayout = (page) => (
  <AppLayout>
    {page}
  </AppLayout>
)

// export const getServerSideProps = userProtectedGetSSP()

export default Page
