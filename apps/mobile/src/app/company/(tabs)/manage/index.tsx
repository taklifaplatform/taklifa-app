import { Cog } from '@tamagui/lucide-icons';
import {
  ManageTeamScreen
} from '@zix/features/companies-dashboard';
import { AppHeader } from '@zix/ui/layouts';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';

export default function Screen() {
  const router = useRouter();
  return (
    <>
      <AppHeader
        showBackButton
        title="Manage Team"
        headerRight={() => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/company/manage/settings`)
            }
          >
            <Cog size="$2" />
          </TouchableOpacity>
        )}
      />
      <ManageTeamScreen />
    </>
  );
}
