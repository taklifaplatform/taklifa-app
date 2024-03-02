import { ChangePasswordScreen } from '@zix/features/account';
import { AppHeader } from '@zix/ui/common';
import { t } from 'i18next';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader
        headerBackgroundColor="transparent"
        showBackButton
        title={t('auth:change_password.title')}
      />
      <ChangePasswordScreen />
    </>
  );
}
