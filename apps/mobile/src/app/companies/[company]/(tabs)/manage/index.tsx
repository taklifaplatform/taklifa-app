import { Cog } from '@tamagui/lucide-icons';
import {
  ManageTeamScreen,
  useCompanyManagerContext,
} from '@zix/features/companies-dashboard';
import { AppHeader } from '@zix/ui/common';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';

export default function Screen() {
  const router = useRouter();
  const { activeCompany } = useCompanyManagerContext();
  return (
    <>
      <AppHeader
        showBackButton
        title="Manage Team"
        headerRight={() => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/companies/${activeCompany?.id}/manage/settings`)
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
