import { ShipmentTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { useMemo } from 'react';

export function useShipmentHelper({
  shipment,
}: {
  shipment: ShipmentTransformer;
}) {
  const { user } = useAuth();

  const canEditShipment = useMemo(() => {
    return shipment.user?.id === user?.id;
  }, [user, shipment]);

  /**
   * Check if the current user can view the shipment interactions
   */
  const canViewShipmentInteractions = useMemo(() => {
    return shipment.user?.id === user?.id;
  }, [user, shipment]);

  return {
    shipment,
    canEditShipment,
    canViewShipmentInteractions,
  };
}
