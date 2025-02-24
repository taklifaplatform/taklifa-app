import { Check, Eye, Settings, X } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { t } from 'i18next';
import React from 'react';
import { useRouter } from 'solito/router';
import { Button, XStack, YStack } from 'tamagui';
import { useShipmentHelper } from '../../hooks';
import ShipmentOwnerActions from '../shipment-owner-actions/shipment-owner-actions';
import { ShipmentProposalActions } from './shipment-proposal-actions';
import ShipmentInvitationActions from './shipment-invitation-actions';
import { useAuth } from '@zix/services/auth';

export type ShipmentCardActionsProps = {
  shipment: ShipmentTransformer;
  variant: 'shipments' | 'jobs';
  urlPrefix: string;
  isDetail?: boolean;
};

export const ShipmentCardActions: React.FC<ShipmentCardActionsProps> = (props) => {
  const {
    shipment,
    variant,
    urlPrefix,
    isDetail = false,
  } = props;

  const router = useRouter();
  const { isAuthOwner } = useShipmentHelper({ shipment })
  const isCancelled = shipment.status === 'cancelled';
  const { isLoggedIn } = useAuth();

  const renderShipmentEdit = () => (isAuthOwner && !isDetail) && (
    <ShipmentOwnerActions shipment={shipment}>
      {({ onPress }) => (
        <Button
          flex={0.2}
          scaleIcon={1.5}
          icon={Settings}
          fontWeight="bold"
          onPress={onPress}
        />
      )}
    </ShipmentOwnerActions>
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
        onPress={() => isLoggedIn ? router.push(`${urlPrefix}/${shipment.id}`) :
          (
            alert(
              "You need to be logged in to view this shipment",
            ),
            router.push(`/auth/login`)
          )}
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
    <YStack gap="$2">
      <XStack flex={1} alignItems="center" gap="$2">
        {renderViewShipment()}
        {renderShipmentEdit()}
        {/* {renderAcceptShipment()} */}

        {/* {renderRejectShipmentInvite()} */}
      </XStack>
      <ShipmentProposalActions
        {...props}
        isCancelled={isCancelled}
      />
      <ShipmentInvitationActions
        {...props}
      />
    </YStack>
  );
};

export default ShipmentCardActions;
