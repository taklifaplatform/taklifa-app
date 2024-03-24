import { ListFilter, MapPin, XCircle } from '@tamagui/lucide-icons';
import { useAuth } from '@zix/services/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, SizableText, Tabs, XStack, YStack } from 'tamagui';
import ManageTeamFabButton from '../../../components/manage-team-fab-button/manage-team-fab-button';
import MembersListScreen from '../members/members-list-screen/members-list-screen';
import VehiclesListScreen from '../vehicles/vehicles-list-screen/vehicles-list-screen';

/* eslint-disable-next-line */
export interface ManageTeamScreenProps {}

export function ManageTeamScreen(props: ManageTeamScreenProps) {
  const { user } = useAuth();

  // taps
  const renderFilters = () => {
    const filters = [
      {
        name: 'Location',
        icon: <MapPin size="$1" color="$color5" />,
        value: 'all',
      },
      {
        name: 'Type',
        icon: <ListFilter size="$1" color="$color5" />,
        value: 'all',
      },
      {
        name: 'State',
        icon: <XCircle size="$1" color="$color5" />,
        value: 'all',
      },
    ];
    return null;
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack space="$2" paddingVertical="$2">
          {filters.map((filter) => (
            <Button
              size="$3"
              fontWeight="bold"
              backgroundColor="$color2"
              borderColor="$color5"
              borderRadius="$5"
              icon={filter.icon}
            >
              <SizableText fontWeight="500" fontSize="$1">
                {filter.name}: {filter.value}
              </SizableText>
            </Button>
          ))}
        </XStack>
      </ScrollView>
    );
  };

  const renderHorizonTabs = () => {
    return (
      <Tabs
        flex={1}
        defaultValue="tab1"
        orientation="horizontal"
        flexDirection="column"
        marginTop="$4"
      >
        <Tabs.List aria-label="Manage your account" paddingHorizontal="$4">
          <Tabs.Tab flex={1} value="tab1" borderRadius="$4">
            <SizableText fontFamily="$body">Manager</SizableText>
          </Tabs.Tab>
          <Tabs.Tab flex={1} value="tab2" borderRadius="$4">
            <SizableText fontFamily="$body">Drivers</SizableText>
          </Tabs.Tab>
          <Tabs.Tab flex={1} value="tab3" borderRadius="$4">
            <SizableText fontFamily="$body">Vehicles</SizableText>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="tab1" flex={1}>
          {renderFilters()}
          {!!user?.active_company?.id && (
            <MembersListScreen
              memberRole="company_manager"
              company_id={user?.active_company.id}
            />
          )}
        </Tabs.Content>

        <Tabs.Content value="tab2" flex={1}>
          {renderFilters()}
          {!!user?.active_company?.id && (
            <MembersListScreen
              memberRole="company_driver"
              company_id={user?.active_company.id}
            />
          )}
        </Tabs.Content>

        <Tabs.Content value="tab3" flex={1}>
          {renderFilters()}
          <VehiclesListScreen />
        </Tabs.Content>
      </Tabs>
    );
  };

  return (
    <YStack flex={1}>
      {renderHorizonTabs()}
      <ManageTeamFabButton />
    </YStack>
  );
}

export default ManageTeamScreen;
