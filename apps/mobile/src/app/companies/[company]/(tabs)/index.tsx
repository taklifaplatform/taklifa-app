import { HomeScreen } from '@zix/app/features/companies-dashboard';
import { AppHeader } from '@zix/app/ui/common';
import React from 'react';

export default function Screen() {
  // const {company} = useActiveCompany()
  return (
    <>
      <AppHeader title={'Dashboard (TODO)'} />
      <HomeScreen />
    </>
  );
}
