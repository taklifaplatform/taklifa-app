import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AccountScreen } from '@zix/features/account';
import { DashboardSwitcher } from '@zix/features/companies-dashboard';
import { AppHeader } from '@zix/ui/layouts';
import { CustomIcon } from '@zix/ui/icons';

export default function Screen() {
  return (
    <>


      <AccountScreen />
    </>
  );
}
