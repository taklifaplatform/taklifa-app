import { useCompanyManagerContext } from '@zix/features/companies-dashboard';
import { HomeScreen } from '@zix/features/customer-dashboard';
import { AppHeader } from '@zix/ui/common';
import React from 'react';

export default function Screen() {
  const { activeCompany } = useCompanyManagerContext();
  return (
    <>
      <AppHeader title={activeCompany?.name || '...'} />
      <HomeScreen />
    </>
  );
}
