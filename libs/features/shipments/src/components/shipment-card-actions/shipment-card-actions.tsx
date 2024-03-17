
import { Eye, X } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { t } from 'i18next';
import React from 'react';
import { useRouter } from 'solito/router';
import { Button, XStack } from 'tamagui';


export type ShipmentCardActionsProps = {
  shipment: ShipmentTransformer
  variant: 'shipments' | 'jobs'
  urlPrefix: string;
}

export const ShipmentCardActions: React.FC<ShipmentCardActionsProps> = ({
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
        backgroundColor='red'
        color='white'
        // href={`/`}
        icon={<X size="$1" />}
      >
        {t('shipment:reject')}
      </Button>
    )

  const renderViewShipment = () => (
    <Button
      onPress={() => router.push(`${urlPrefix}/${shipment.id}`)}
      flex={1}
      icon={<Eye />}
      themeInverse
      fontWeight='bold'
    >
      {t('shipment:see-more')}
    </Button>
  )

  return (
    <XStack
      flex={1}
      alignItems="center"
      gap="$2"
    >
      {renderViewShipment()}
      {renderRejectShipmentInvite()}
    </XStack>
  );
}


export default ShipmentCardActions;
