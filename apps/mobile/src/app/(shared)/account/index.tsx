import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AccountScreen } from '@zix/app/features/account';
import { DashboardSwitcher } from '@zix/app/features/companies-dashboard';
import { AppHeader } from '@zix/app/ui/common';
import { CustomIcon } from '@zix/app/ui/icons';

export default function Screen() {


  return (
    <>
      <AppHeader
        showBackButton
        headerTitle={() => <DashboardSwitcher />}
        headerRight={() => (
          <TouchableOpacity onPress={() => router.push('/account/settings')}>
            <CustomIcon name='settings' color='black' size="$2" />
          </TouchableOpacity>
        )}
      />
      <AccountScreen />
    </>
  );
}
