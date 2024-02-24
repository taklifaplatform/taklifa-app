import { ChangeEmailScreen } from '@zix/features/account';
import { AppHeader } from '@zix/ui/common';
import React from 'react';
import { t } from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title={t('account:change_email.title')} />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <ChangeEmailScreen />
      </SafeAreaView>
    </>
  );
}
