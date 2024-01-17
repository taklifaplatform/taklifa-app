import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Cog } from '@tamagui/lucide-icons';
import { AccountScreen } from '@zix/app/features/account';
import { DashboardSwitcher } from '@zix/app/features/companies-dashboard';
import { AppHeader } from '@zix/app/ui/common';
import { useUser } from '@zix/core/auth';
import { useSupabase } from '@zix/core/supabase';

export default function Screen() {
  const { user } = useUser();
  const supabase = useSupabase();

  const { data } = useQuery(['companies'], {
    queryFn: async () => {
      const { data, error } = await supabase.from('companies').select();
      if (error) {
        throw error;
      }
      return data;
    }
  });

  return (
    <>
      <AppHeader
        showBackButton
        headerTitle={() => <DashboardSwitcher user={user} companies={data} />}
        headerRight={() => (
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Cog size="$2" />
          </TouchableOpacity>
        )}
      />
      <AccountScreen />
    </>
  );
}
