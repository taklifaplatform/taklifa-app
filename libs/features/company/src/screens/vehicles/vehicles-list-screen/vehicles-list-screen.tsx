import { useQuery } from '@tanstack/react-query';
import { CompanyVehiclesService } from '@zix/api';
import { useAuth } from '@zix/services/auth';

import { FlatList } from 'react-native';
import CompanyVehicleCard from '../../../components/company-vehicle-card/company-vehicle-card';


export function VehiclesListScreen() {
  const { user } = useAuth()

  const { data, refetch, isLoading } = useQuery({
    queryFn: () => CompanyVehiclesService.list({
      company: user?.active_company?.id as string,
    }),
    queryKey: ['CompanyVehiclesService.list', user?.active_company?.id],
  })

  const renderItem = ({ item, index }) => (
    <CompanyVehicleCard
      vehicle={item}
      key={`${item.id}-${index}`}
    />
  )

  return (
    <FlatList
      refreshing={isLoading}
      onRefresh={refetch}
      style={{ flex: 1 }}
      data={data?.data || []}
      renderItem={renderItem}
    />
  );
}

export default VehiclesListScreen;
