import { ManageShipmentRecipientScreen } from '@zix/features/shipments';
import { AppLayout } from '@zix/ui/layouts';
import React from 'react';


export const Page = () => {
  return (
    <ManageShipmentRecipientScreen />
  )
}

Page.getLayout = (page) => (
  <AppLayout>
    {page}
  </AppLayout>
)
// export const getServerSideProps = userProtectedGetSSP()

export default Page
