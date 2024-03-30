import { Cog } from '@tamagui/lucide-icons';
import { useAuth } from '@zix/services/auth';
import { ZixTab } from '@zix/ui/common';
import { AppHeader } from '@zix/ui/layouts';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';
import { YStack } from 'tamagui';
import { ManageTeamFabButton } from '../../components/manage-team-fab-button/manage-team-fab-button';
import EmployeesListScreen from '../employees/employees-list-screen/employees-list-screen';
import VehiclesListScreen from '../vehicles/vehicles-list-screen/vehicles-list-screen';


export function ManageCompanyDataScreen() {
  const { user } = useAuth();
  const router = useRouter()

  const renderHorizonTabs = () => user?.active_company?.id && (
    (
      <ZixTab
        defaultActiveTab='managers'
        tabs={[
          {
            key: 'managers',
            title: 'Managers',
            content: (
              <EmployeesListScreen
                memberRole="company_manager"
                company_id={user.active_company.id}
              />
            )
          },
          {
            key: 'drivers',
            title: 'Drivers',
            content: (
              <EmployeesListScreen
                memberRole="company_driver"
                company_id={user.active_company.id}
              />
            )
          },
          {
            key: 'vehicles',
            title: 'Vehicles',
            content: (
              <VehiclesListScreen />
            )
          },
        ]}
      />
    )
  )

  return (
    <>
      <AppHeader
        showBackButton
        title="Manage Team"
        headerRight={() => (
          <TouchableOpacity
            onPress={() => router.push(`/company/manage/settings`)}
          >
            <Cog size="$2" />
          </TouchableOpacity>
        )}
      />
      <YStack flex={1}>
        {renderHorizonTabs()}
        <ManageTeamFabButton />
      </YStack>
    </>

  );
}

export default ManageCompanyDataScreen;
