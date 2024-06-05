import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ShipmentInvitationService, ShipmentTransformer } from '@zix/api';
import { ZixButton } from '@zix/ui/common';
import { t } from 'i18next';
import React from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'solito/router';
import { XStack } from 'tamagui';

export type ShipmentInvitationActionsProps = {
  shipment: ShipmentTransformer;
  variant: 'shipments' | 'jobs';
  urlPrefix: string;
  isDetail?: boolean;
};

export const ShipmentInvitationActions: React.FC<ShipmentInvitationActionsProps> = ({
  shipment,
  urlPrefix,
  variant,
  isDetail,
}) => {
  const router = useRouter();
  const toast = useToastController();

  const { data, ...permissionQuery } = useQuery({
    queryFn: () => ShipmentInvitationService.getPermissions({
      shipment: shipment.id,
    }),
    queryKey: ['ShipmentInvitationService.getPermissions', shipment.id],
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => ShipmentInvitationService.declineShipmentInvitation({
      shipment: shipment.id,
      shipmentInvitation: data?.data?.invitation?.id,
    }),
    onSuccess() {
      toast.show('Invitation declined', { preset: 'success' });
      permissionQuery.refetch()
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
    }
  })

  function onDeclinePress() {
    Alert.alert(
      'Are you sure you want to decline this invitation?',
      'You will not be able to access this shipment',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: () => mutateAsync(),
        },
      ],
    );
  }




  const renderAcceptInvitationButton = () => (
    <ZixButton
      flex={1}
      theme='accent'
      themeInverse
      fontWeight="bold"
      backgroundColor='$color10'
      fontSize='$1'
      onPress={() => router.push(`${urlPrefix}/${shipment.id}/invitations/${data?.data?.invitation?.id}/accept`)}
    >
      Accept Invitation
    </ZixButton>
  )

  const renderRejectInvitationButton = () => (
    <ZixButton
      flex={1}
      theme='error'
      themeInverse
      fontWeight="bold"
      backgroundColor='$color10'
      fontSize='$1'
      loading={isPending}
      onPress={onDeclinePress}
    >
      Decline Invitation
    </ZixButton>
  )


  if (!isDetail || !data?.data?.has_invitation) {
    return null
  }

  return (
    <XStack gap='$2'>
      {renderAcceptInvitationButton()}
      {renderRejectInvitationButton()}
    </XStack>

  );
};

export default ShipmentInvitationActions;
