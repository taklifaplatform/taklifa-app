import { Check, Eye, Pen, Settings2, X } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import { useRouter } from 'solito/router';
import { Button, XStack } from 'tamagui';

export type ShipmentCardActionsProps = {
  shipment: ShipmentTransformer;
  variant: 'shipments' | 'jobs';
  urlPrefix: string;
  isDetail?: boolean;
};

export const ShipmentCardActions: React.FC<ShipmentCardActionsProps> = ({
  shipment,
  urlPrefix,
  variant,
  isDetail,
}) => {
  const router = useRouter();
  const { user } = useAuth()

  const isAuthCreator = useMemo(() => {
    return user?.id === shipment.user?.id
  }, [user, shipment.user])

  const renderShipmentEdit = () => isAuthCreator && (
    <Button
      theme='accent'
      flex={1}
      icon={Pen}
      fontWeight="bold"
      onPress={() => router.push(`${urlPrefix}/${shipment.id}/edit`)}
    >
      {t('shipment:edit')}
    </Button>
  )

  /**
   * The Driver, can only see the reject button if he is been invited to this shipments
   *
   */
  const renderRejectShipmentInvite = () =>
    variant === 'shipments' &&
    shipment.status === 'pending' &&
    isDetail && (
      <Button
        flex={1}
        backgroundColor="red"
        color="white"
        hoverStyle={{ backgroundColor: '$red8' }}
        // href={`/`}
        icon={<X size="$1" />}
      >
        {t('shipment:reject')}
      </Button>
    );

  const renderViewShipment = () =>
    !isDetail && (
      <Button
        onPress={() => router.push(`${urlPrefix}/${shipment.id}`)}
        flex={1}
        icon={<Eye />}
        themeInverse
        fontWeight="bold"
      >
        {t('shipment:see-more')}
      </Button>
    );
  const renderAcceptShipment = () =>
    !!isDetail && (
      <Button
        onPress={() => router.push(`${urlPrefix}/${shipment.id}`)}
        flex={1}
        icon={<Check />}
        fontWeight="bold"
      >
        {t('shipment:shipment-accept')}
      </Button>
    );

  return (
    <XStack flex={1} alignItems="center" gap="$2">
      {renderShipmentEdit()}
      {renderAcceptShipment()}
      {renderViewShipment()}
      {renderRejectShipmentInvite()}
    </XStack>
  );
};

export default ShipmentCardActions;
