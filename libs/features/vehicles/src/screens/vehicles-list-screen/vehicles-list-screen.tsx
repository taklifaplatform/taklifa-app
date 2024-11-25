import { useQuery } from '@tanstack/react-query';
import { VehiclesService } from '@zix/api';
import { useAuth } from '@zix/services/auth';

import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { FlatList } from 'react-native';
import { VehicleCard } from '../../components';
import { H4, View } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';

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
  console.log('data', JSON.stringify(data?.data,null,2));

  return (
    <ScreenLayout>
     {showHeader && <AppHeader title="Manage Vehicles" />}
      <FlatList
        refreshing={isLoading}
        onRefresh={refetch}
        style={{ flex: 1 }}
        data={data?.data || []}
        renderItem={renderItem}
        ListEmptyComponent={
          <View flex={1} alignItems='center' gap="$8" paddingTop="$8">
            <CustomIcon name="empty_data" size="$18" color="$color5" />
            <H4>No Vehicles Found!</H4>
          </View>
        }
      />
    </ScreenLayout>
  );
}

export default VehiclesListScreen;
