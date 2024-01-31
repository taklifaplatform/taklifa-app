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
          <TouchableOpacity 
          style={{
            backgroundColor: '#F6F6F6',
            borderRadius: 4,
            padding: 5,
          }}
          onPress={() => router.push('/account/settings')}>
            <CustomIcon name='more' color='black' size="$3" />
          </TouchableOpacity>
        )}
        headerBackgroundColor='transparent'
      />
      
      <AccountScreen />
    </>
  );
}
