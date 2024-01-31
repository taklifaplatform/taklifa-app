import { ChangePasswordScreen } from '@zix/app/features/account';
import { AppHeader } from '@zix/app/ui/common';
import React from 'react';
import { t } from 'i18next';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title={t('auth:change_password.title')} />
      <ChangePasswordScreen />
    </>
  );
}
