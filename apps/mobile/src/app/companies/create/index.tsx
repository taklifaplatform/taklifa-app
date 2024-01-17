import React from 'react';

import { CreateCompanyScreen } from '@zix/app/features/companies-dashboard';
import { AppHeader } from '@zix/app/ui/common';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Create Company" />
      <CreateCompanyScreen />
    </>
  );
}
