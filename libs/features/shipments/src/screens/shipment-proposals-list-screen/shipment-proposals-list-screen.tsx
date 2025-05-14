

import { useQuery } from '@tanstack/react-query';
import { ShipmentProposalService } from '@zix/api';
import { useMixpanel } from '@zix/services/auth';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { FlatList } from 'react-native';
import { useShipment } from '../../hooks';
import ShipmentProposalCard from './shipment-proposal-card';

export function ShipmentProposalsListScreen() {
  useMixpanel('Shipment Proposals List Screen view')
  const { shipmentId } = useShipment()
  const { data, refetch, isLoading } = useQuery({
    queryFn() {
      return shipmentId ? ShipmentProposalService.fetchShipmentProposals({
        shipment: shipmentId,
      }) : { data: [] };
    },
    queryKey: ['ShipmentProposalService.fetchShipmentProposals', shipmentId],
  });

  const renderItem = ({ item, index }) => (
    <ShipmentProposalCard
      key={index}
      proposal={item}
    />
  )

  return (
    <ScreenLayout authProtected safeAreaBottom>
      <AppHeader title={t('common:shipment-proposals')} showBackButton />
      <FlatList
        refreshing={isLoading}
        onRefresh={refetch}
        data={data?.data}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}

export default ShipmentProposalsListScreen;
