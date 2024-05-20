import { useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { useMemo } from 'react';
import { createParam } from 'solito';

const { useParam } = createParam<{ shipment: string; job: string }>();

export type ShipmentHookProps = {
  variant: 'shipments' | 'jobs';
};
/**
 * This hook responsible for fetching current shipment data.
 * the active shipment is fetched from the users param {shipment} || {job}
 */
export function useShipment(
  { variant }: ShipmentHookProps = { variant: 'shipments' },
) {
  const [shipmentId] = useParam(variant === 'shipments' ? 'shipment' : 'job');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['ShipmentService.retrieveShipment', { id: shipmentId }],
    queryFn: () =>
      ShipmentService.retrieveShipment({ shipment: shipmentId || '' }),
  });

  const shipment = useMemo(() => data?.data, [data]);

  return {
    shipmentId,
    shipment,
    isLoading,
    refetch,
  };
}
