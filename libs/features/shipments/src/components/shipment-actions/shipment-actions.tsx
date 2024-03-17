
import { Check, X } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { t } from 'i18next';
import React from 'react';
import { useRouter } from 'solito/router';
import { Button, XStack } from 'tamagui';


export type ShipmentActionsProps = {
  shipment: ShipmentTransformer
  variant: 'shipments' | 'jobs'
  urlPrefix: string;
}

export const ShipmentActions: React.FC<ShipmentActionsProps> = ({
  shipment,
  urlPrefix,
  variant
}) => {
  const router = useRouter()

  /**
   * The Driver, can only see the reject button if he is been invited to this shipments
   *
   */
  const renderRejectShipmentInvite = () => (
    variant === 'shipments' &&
    shipment.status === 'pending'
  ) && (
      <Button
        flex={1}
        icon={<Check size="$1" />}
        onPress={() => router.push(`${urlPrefix}/${shipment.id}/accept`)}
      >
        {t('shipment:shipment-accept')}
      </Button>
    )

  const renderRejectShipmentButton = () => (
    <Button
      flex={1}
      backgroundColor='red'
      color='white'
      icon={<X />}
      onPress={() => router.push(`${urlPrefix}/${shipment.id}/reject`)}
    >
      {t('shipment:shipment-reject')}
    </Button>
  )

  return (
    <XStack
      flex={1}
      alignItems="center"
      gap="$2"
    >
      {renderRejectShipmentInvite()}
      {renderRejectShipmentButton()}
    </XStack>
  );
}


export default ShipmentActions;
