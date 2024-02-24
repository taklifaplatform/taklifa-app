import { AccountScreen } from '@zix/features/account';
import { AppHeader } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function Screen() {
  return (
    <>
      <AppHeader
        showBackButton
        headerRight={() => (
          <TouchableOpacity
            style={{
              backgroundColor: '#F6F6F6',
              borderRadius: 4,
              padding: 5,
            }}
            onPress={() => router.push('/account/settings')}
          >
            <CustomIcon name="more" color="black" size="$3" />
          </TouchableOpacity>
        )}
        headerBackgroundColor="transparent"
      />

      <AccountScreen />
    </>
  );
}
