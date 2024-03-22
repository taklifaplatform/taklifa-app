

import { EditAccountScreen } from '@zix/features/account'
import { AppLayout } from '@zix/ui/layouts'
import { NextPageWithLayout } from '../../_app'

export const Page: NextPageWithLayout = () => {
  return (
    <EditAccountScreen />
  )
}

Page.getLayout = (page) => (
  <AppLayout>{page}</AppLayout>
)
// export const getServerSideProps = userProtectedGetSSP()

export default Page
