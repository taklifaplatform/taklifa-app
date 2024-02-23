import { EditAccountScreen } from '@zix/app/features/account';
import { AppHeader } from '@zix/app/ui/common';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  return (
    <>
      <AppHeader
        showBackButton
        title="General"
        headerBackgroundColor="transparent"
      />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <EditAccountScreen />
      </SafeAreaView>
    </>
  );
}
