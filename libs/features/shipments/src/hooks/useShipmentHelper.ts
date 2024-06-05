import { ShipmentTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { useMemo } from 'react';

export function useShipmentHelper({
  shipment,
}: {
  shipment: ShipmentTransformer;
}) {
  const { user } = useAuth();

  const isAuthOwner = useMemo(() => {
    return shipment.user?.id === user?.id;
  }, [user, shipment]);

  const canEditShipment = useMemo(() => {
    if (!isAuthOwner) {
      return false;
    }

    // Editable Statuses
    return (
      shipment.status && ['pending', 'cancelled'].includes(shipment.status)
    );
  }, [isAuthOwner, shipment.status]);

  const getShipmentStatusColor = useMemo(() => {
    if (shipment.status === 'cancelled') {
      return 'error';
    }
    if (shipment.status === 'pending') {
      return 'warning';
    }
    if (shipment.status === 'delivered') {
      return 'success';
    }
    return 'accent';
  }, [shipment.status]);

  /**
   * Check if the current user can view the shipment interactions
   */
  const canViewShipmentInteractions = useMemo(() => {
    return shipment.user?.id === user?.id;
  }, [user, shipment]);

  return {
    shipment,
    isAuthOwner,
    canEditShipment,
    canViewShipmentInteractions,
    getShipmentStatusColor,
  };
}
