
import { useQuery } from '@tanstack/react-query';
import { ShipmentProposalService } from '@zix/api';
import { DebugObject, FullScreenSpinner } from '@zix/ui/common';
import { AppHeader } from '@zix/ui/layouts';
import { createParam } from 'solito';

import { Text, View } from 'tamagui';
import ShipmentProposalCard from '../shipment-proposals-list-screen/shipment-proposal-card';


const { useParam } = createParam<{ shipment: string; proposal: string }>();


export function ShipmentProposalDetailScreen() {
  const [shipmentId] = useParam('shipment');
  const [proposalId] = useParam('proposal');

  const { data } = useQuery({
    queryFn: () => ShipmentProposalService.retrieveShipmentProposal({
      shipment: shipmentId || '',
      shipmentProposal: proposalId || ''
    }),
    queryKey: ['ShipmentProposalService.retrieveShipmentProposal', shipmentId, proposalId]
  })
  return (
    <>
      <AppHeader title='Shipment Proposal Detail' showBackButton />
      {data?.data?.id ? <ShipmentProposalCard proposal={data?.data} /> : (
        <FullScreenSpinner />
      )}
    </>
  );
}


export default ShipmentProposalDetailScreen;
