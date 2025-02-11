import { CompanyProfileScreen } from '@zix/features/company';
import { AppLayout } from '@zix/ui/layouts';
import React from 'react';

export const Screen = () => {
  return (
    <CompanyProfileScreen />
  )
}

Screen.getLayout = (Screen) => (
  <AppLayout>
    {Screen}
  </AppLayout>
)
// export const getServerSideProps = userProtectedGetSSP()

export default Screen
