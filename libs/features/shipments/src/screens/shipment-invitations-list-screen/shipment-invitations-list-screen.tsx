

import { useQuery } from '@tanstack/react-query';
import { ShipmentInvitationService } from '@zix/api';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { FlatList } from 'react-native';
import { useShipment } from '../../hooks';
import ShipmentInvitationCard from './shipment-invitation-card';
import { t } from "i18next";


export function ShipmentInvitationsListScreen() {
  const { shipmentId } = useShipment()
  const { data, refetch, isLoading } = useQuery({
    queryFn() {
      return shipmentId ? ShipmentInvitationService.fetchShipmentInvitations({
        shipment: shipmentId,
      }) : { data: [] };
    },
    queryKey: ['ShipmentInvitationService.fetchShipmentInvitations', shipmentId],
  });

  const renderItem = ({ item, index }) => (
    <ShipmentInvitationCard
      key={index}
      invitation={item}
    />
  )

  return (
    <ScreenLayout authProtected safeAreaBottom>
      <AppHeader title={t('common:shipment-invitations')} showBackButton />
      <FlatList
        refreshing={isLoading}
        onRefresh={refetch}
        data={data?.data}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}


export default ShipmentInvitationsListScreen;
