import { UpdateCompanyScreen } from '@zix/features/companies-dashboard';
import { AppHeader } from '@zix/ui/layouts';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Update Company" />
      <UpdateCompanyScreen />
    </>
  );
}
