import { SettingsScreen } from '@zix/features/account';
import { AppHeader } from '@zix/ui/common';
import { t } from 'i18next';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader
        showBackButton
        title={t('account:settings.title')}
        headerBackgroundColor="transparent"
      />
      <SettingsScreen />
    </>
  );
}
