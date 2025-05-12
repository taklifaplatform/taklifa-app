import { useQuery } from '@tanstack/react-query';
import { VehiclesService } from '@zix/api';
import { useAuth, USER_ROLES } from '@zix/services/auth';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { FlatList } from 'react-native';
import { VehicleCard } from '../../components';
import { Button, H4, Theme, View, YStack } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { useRouter } from 'solito/router';
import { Plus } from '@tamagui/lucide-icons';
import { t } from 'i18next';
import { ServicesListScreen } from '@zix/features/services';
import { ZixTab } from '@zix/ui/common';
export type VehiclesListScreenProps = {
  showHeader?: boolean;
  search?: string;
};

export const VehiclesListScreen: React.FC<VehiclesListScreenProps> = ({
  showHeader,
  search,
}) => {
  const { user, activeRole } = useAuth();
  const router = useRouter();

  //
  const { data, refetch, isLoading } = useQuery({
    queryFn: () =>
      VehiclesService.fetchAllVehicles({
        search
      }),

    queryKey: ['VehiclesService.fetchAllVehicles', user?.active_role?.id, user?.active_company?.id, `-${search}`,],
  });

  const renderHorizonTabs = () => (
    <ZixTab
      defaultActiveTab="vehicles"
      tabs={[
        {
          key: 'vehicles',
          title: t('common:vehicles'),
          content: renderVehicleScreen(),
        },
        {
          key: 'services',
          title: t('common:services'),
          content: <ServicesListScreen showHeader={false} driver={true} />,
        },
      ]}
    />
  );

  const renderItem = ({ item, index }) => (
    <VehicleCard vehicle={item} key={`${item.id}-${index}`} showHeader={showHeader} />
  );

  // Fab Button
  const renderFabButton = () => (
    <Theme name='accent'>
      <Button
        position="absolute"
        width="$5"
        height="$5"
        size="$5"
        bottom="$3"
        right="$3"
        icon={<Plus size="$2.5" />}
        borderRadius="$10"
        onPress={() => router.push(`/app/company/vehicles/create`)}
      />
    </Theme>
  )

  // Vehicle screen

  const renderVehicleScreen = () => (
    <YStack flex={1}>
      <FlatList
        refreshing={isLoading}
        onRefresh={refetch}
        style={{ flex: 1 }}
        data={data?.data || []}
        renderItem={renderItem}
        ListEmptyComponent={
          <View flex={1} alignItems='center' gap="$8" paddingTop="$8">
            <CustomIcon name="empty_data" size="$18" color="$color5" />
            <H4>{t('common:no-vehicles-found')}</H4>
          </View>
        }
      />
    </YStack>
  )

  return (
    <ScreenLayout>
      {showHeader && <AppHeader title={t('common:manage-vehicles')} />}
      <YStack flex={1} paddingVertical="$4">
        {!showHeader ? renderVehicleScreen() : renderHorizonTabs()}
      </YStack>
      {!data?.data.length && showHeader && activeRole === USER_ROLES.solo_driver && renderFabButton()}
    </ScreenLayout>
  );
}

export default VehiclesListScreen;
