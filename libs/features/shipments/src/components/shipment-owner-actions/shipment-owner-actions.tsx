
import { Eye, Pencil, Send, Trash2, UsersRound } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { ActionSheet, ActionSheetRef } from '@zix/ui/common';
import React, { useRef } from 'react';

import { useAuth } from '@zix/services/auth';
import { t } from 'i18next';
import { useRouter } from 'solito/router';
import { useShipmentHelper } from '../../hooks';

export type ShipmentOwnerActionsProps = {
  shipment: ShipmentTransformer;
  children: ({ onPress }: { onPress: () => void }) => React.ReactNode;
}


export const ShipmentOwnerActions: React.FC<ShipmentOwnerActionsProps> = ({
  shipment,
  children
}) => {
  const router = useRouter();

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { getUrlPrefix } = useAuth()
  const { isAuthOwner } = useShipmentHelper({ shipment })

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
        title="Select"
        snapPoints={[50, 50]}
        actions={[
          {
            name: 'View Request',
            icon: <Eye size="$2" color="$color10" />,
            onPress: () => {
              actionSheetRef.current?.close();
              router.push(`${getUrlPrefix}/shipments/${shipment.id}`)
            },
          },
          {
            name: 'View Proposals',
            icon: <UsersRound size="$2" color="$color10" />,
            onPress: () => {
              actionSheetRef.current?.close();
              router.push(`${getUrlPrefix}/shipment-manager/${shipment.id}/proposals`)
            },
          },
          {
            name: 'View Invitations',
            icon: <Send size="$2" color="$color10" />,
            onPress: () => {
              actionSheetRef.current?.close();
              router.push(`${getUrlPrefix}/shipment-manager/${shipment.id}/invitations`)
            },
          },
          {
            name: t('common:edit'),
            icon: <Pencil size="$2" color="$color10" />,
            onPress: () => {
              actionSheetRef.current?.close();
              router.push(`${getUrlPrefix}/shipment-manager/${shipment.id}`)
            },
          },
          {
            name: t('common:delete'),
            icon: <Trash2 size="$2" color="$color10" />,
            onPress: () => {
              actionSheetRef.current?.close();
            },
          },
        ]}

      />
    </>
  );
}


export default ShipmentOwnerActions;
