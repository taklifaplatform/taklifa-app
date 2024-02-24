import React from 'react';

import { CreateCompanyScreen } from '@zix/features/companies-dashboard';
import { AppHeader } from '@zix/ui/common';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Create Company" />
      <CreateCompanyScreen />
    </>
  );
}
