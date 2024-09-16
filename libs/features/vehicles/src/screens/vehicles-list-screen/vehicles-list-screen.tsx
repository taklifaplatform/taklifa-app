import { useQuery } from '@tanstack/react-query';
import { VehiclesService } from '@zix/api';
import { useAuth } from '@zix/services/auth';

import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { FlatList } from 'react-native';
import { VehicleCard } from '../../components';

export type VehiclesListScreenProps = {
  showHeader?: boolean;
};

export const VehiclesListScreen: React.FC<VehiclesListScreenProps> = ({
  showHeader,
}) => {
  const { user } = useAuth();

  const { data, refetch, isLoading } = useQuery({
    queryFn: () =>
      VehiclesService.fetchAllVehicles({}),
    queryKey: ['VehiclesService.fetchAllVehicles', user?.active_role?.id, user?.active_company?.id],
  });

  const renderItem = ({ item, index }) => (
    <VehicleCard vehicle={item} key={`${item.id}-${index}`} />
  );

  return (
    <ScreenLayout>
      {showHeader && <AppHeader title="Manage Vehicles" />}
      <FlatList
        refreshing={isLoading}
        onRefresh={refetch}
        style={{ flex: 1 }}
        data={data?.data || []}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}

export default VehiclesListScreen;
