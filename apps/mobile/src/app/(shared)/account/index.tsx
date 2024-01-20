import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Cog } from '@tamagui/lucide-icons';
import { AccountScreen } from '@zix/app/features/account';
import { DashboardSwitcher } from '@zix/app/features/companies-dashboard';
import { AppHeader } from '@zix/app/ui/common';

export default function Screen() {


  return (
    <>
      <AppHeader
        showBackButton
        headerTitle={() => <DashboardSwitcher />}
        headerRight={() => (
          <TouchableOpacity onPress={() => router.push('/account/settings')}>
            <Cog size="$2" />
          </TouchableOpacity>
        )}
      />
      <AccountScreen />
    </>
  );
}
