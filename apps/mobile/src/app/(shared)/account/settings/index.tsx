import { SettingsScreen } from '@zix/app/features/account';
import { AppHeader } from '@zix/app/ui/common';
import React from 'react';
import { t } from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  return (
    <>
      <AppHeader
        showBackButton
        title={t('account:settings.title')}
        headerBackgroundColor="transparent"
      />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <SettingsScreen />
      </SafeAreaView>
    </>
  );
}
