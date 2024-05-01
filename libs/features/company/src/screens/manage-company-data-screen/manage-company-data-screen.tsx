import { Cog } from '@tamagui/lucide-icons';
import { useAuth } from '@zix/services/auth';
import { ZixTab } from '@zix/ui/common';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';
import { YStack } from 'tamagui';
import { ManageTeamFabButton } from '../../components/manage-team-fab-button/manage-team-fab-button';
import EmployeesListScreen from '../employees/employees-list-screen/employees-list-screen';
import VehiclesListScreen from '../vehicles/vehicles-list-screen/vehicles-list-screen';
import { t } from 'i18next';

export function ManageCompanyDataScreen() {
  const router = useRouter();
  const { getUrlPrefix } = useAuth();

  const [search, setSearch] = useState<string>();

  const renderHorizonTabs = () => (
    <ZixTab
      defaultActiveTab="managers"
      tabs={[
        {
          key: 'managers',
          title: t('common:managers'),
          content: (
            <EmployeesListScreen memberRole="company_manager" search={search} />
          ),
        },
        {
          key: 'drivers',
          title: t('common:drivers'),
          content: (
            <EmployeesListScreen memberRole="company_driver" search={search} />
          ),
        },
        {
          key: 'vehicles',
          title: t('common:vehicles'),
          content: <VehiclesListScreen />,
        },
      ]}
    />
  );

  return (
    <ScreenLayout>
      <AppHeader
        showBackButton
        title={t('common:manage-team')}
        showSearchBar
        searchProps={{
          value: search,
          onChangeText: setSearch,
        }}
        headerRight={() => (
          <TouchableOpacity
            onPress={() => router.push(`${getUrlPrefix}/company/settings`)}
          >
            <Cog size="$2" />
          </TouchableOpacity>
        )}
      />
      <YStack flex={1} paddingVertical="$4">
        {renderHorizonTabs()}
        <ManageTeamFabButton />
      </YStack>
    </ScreenLayout>
  );
}

export default ManageCompanyDataScreen;
