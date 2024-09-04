
import { Eye, Pencil, Send, Trash2, UsersRound } from '@tamagui/lucide-icons';
import { ShipmentService, ShipmentTransformer } from '@zix/api';
import { ActionSheet, ActionSheetRef } from '@zix/ui/common';
import React, { useRef } from 'react';

import { useAuth } from '@zix/services/auth';
import { t } from 'i18next';
import { useRouter } from 'solito/router';
import { useShipmentHelper } from '../../hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useToastController } from '@tamagui/toast';

export type ShipmentOwnerActionsProps = {
  shipment: ShipmentTransformer;
  children: ({ onPress }: { onPress: () => void }) => React.ReactNode;
}


export const ShipmentOwnerActions: React.FC<ShipmentOwnerActionsProps> = ({
  shipment,
  children
}) => {
  const router = useRouter();
  const toast = useToastController();
  const queryClient = useQueryClient();

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { getUrlPrefix } = useAuth()
  const { isAuthOwner } = useShipmentHelper({ shipment })

  const { mutateAsync } = useMutation({
    mutationFn: () => ShipmentService.destroyShipment({ shipment: shipment.id }),
    onSuccess(data, variables, context) {
      console.log('data', data)
      toast.show('Shipment deleted successfully', { preset: 'success' })
      queryClient.refetchQueries({
        queryKey: ['ShipmentService.fetchAllShipment']
      })

      router.push(`${getUrlPrefix}/shipments`)
    },
    onError(error: any) {
      console.log('error', error)
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
    }
  })

  if (!isAuthOwner) {
    return null;
  }
  return (
    <>
      {
        children({
          onPress: () => {
            actionSheetRef.current?.open()
          }
        })
      }
      <ActionSheet
        ref={actionSheetRef}
        title={t('plain:Select an action')}
        snapPoints={[50, 50]}
        actions={[
          {
            name: t('plain:View Request'),
            icon: <Eye size="$2" color="$color10" />,
            onPress: () => {
              actionSheetRef.current?.close();
              router.push(`${getUrlPrefix}/shipments/${shipment.id}`)
            },
          },
          {
            name: t('plain:View Proposals'),
            icon: <UsersRound size="$2" color="$color10" />,
            onPress: () => {
              actionSheetRef.current?.close();
              router.push(`${getUrlPrefix}/shipment-manager/${shipment.id}/proposals`)
            },
          },
          {
            name: t('plain:View Invitations'),
            icon: <Send size="$2" color="$color10" />,
            onPress: () => {
              actionSheetRef.current?.close();
              router.push(`${getUrlPrefix}/shipment-manager/${shipment.id}/invitations`)
            },
          },
          {
            name: t('plain:Edit'),
            icon: <Pencil size="$2" color="$color10" />,
            onPress: () => {
              actionSheetRef.current?.close();
              router.push(`${getUrlPrefix}/shipment-manager/${shipment.id}`)
            },
          },
          {
            name: t('plain:Delete'),
            icon: <Trash2 size="$2" color="$color10" />,
            onPress: () => {
              Alert.alert(
                t('plain:Delete Shipment'),
                t('plain:Are you sure you want to delete this shipment?'),
                [
                  {
                    text: t('plain:Cancel'),
                    onPress: () => {
                      actionSheetRef.current?.close();
                    },
                    style: 'cancel'
                  },
                  {
                    text: t('plain:Delete'),
                    onPress: () => {
                      mutateAsync()
                      actionSheetRef.current?.close();

                    },
                    style: 'destructive'
                  }
                ]
              )
            },
          },
        ]}

      />
    </>
  );
}


export default ShipmentOwnerActions;
