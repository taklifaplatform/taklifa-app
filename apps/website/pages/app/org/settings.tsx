import { UpdateCompanyScreen } from '@zix/features/company';
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
