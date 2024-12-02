import { UpdateCompanyScreen } from '@zix/features/company';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title={t('common:update-company')} />
      <UpdateCompanyScreen />
    </>
  );
}
