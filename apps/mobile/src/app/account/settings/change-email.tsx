import { ChangeEmailScreen } from '@zix/features/account';
import { AppHeader } from '@zix/ui/common';
import { t } from 'i18next';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader
        showBackButton
        headerBackgroundColor="transparent"
        title={t('account:change_email.title')}
      />
      <ChangeEmailScreen />
    </>
  );
}
