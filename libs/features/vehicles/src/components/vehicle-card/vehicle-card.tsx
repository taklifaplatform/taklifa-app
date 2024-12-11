
import { Brush, CarFront, Eye, MoreHorizontal, Pencil, TextCursorInput, Trash2 } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VehicleTransformer, VehiclesService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { ActionSheet, ActionSheetRef, MediaFile } from '@zix/ui/common';
import { ZixVariantOptionsWidget } from '@zix/ui/widgets';
import { t } from 'i18next';
import React, { useRef } from 'react';
import { Alert } from 'react-native';

import { useRouter } from 'solito/router';
import { XStack, View, Button } from 'tamagui';

export type VehicleCardProps = {
  vehicle: VehicleTransformer,
  showHeader: boolean
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  showHeader = false
}) => {
  const { user, getUrlPrefix } = useAuth()
  const router = useRouter()
  const actionSheetManagerRef = useRef<ActionSheetRef>(null);
  const toast = useToastController()

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn() {
      return VehiclesService.deleteVehicle({
        vehicle: vehicle.id || '',
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['CompanyVehiclesService.list', user?.active_company?.id],
      });
      toast.show('Vehicle Removed Successfully!');
    },
    onError(error) {
      toast.show('Failed to remove vehicle');
    }
  })

  return (
    <XStack
      width='100%'
      paddingVertical='$3'
      marginBottom='$4'
      borderRadius='$4'
      borderBottomColor='$color3'
      borderBottomWidth='$1'
    >
      <XStack gap='$2' flex={1} onPress={() => actionSheetManagerRef.current?.open()}>
        <MediaFile media={vehicle.image} width='$10' height='$6' borderRadius='$4' heightQuality />
        <View flex={1}>
          <ZixVariantOptionsWidget
            optionVariant="location"
            variant="location"
            options={[
              {
                icons: <CarFront size="$1" color='$color11' />,
                value: vehicle.name ?? 'N/A',
              },
              {
                icons: <TextCursorInput size="$1" color='$color11' />,
                value: vehicle.plate_number ?? 'N/A',
              },
              {
                icons: <Brush size="$1" color='$color11' />,
                value: vehicle.color ?? 'N/A',
              },
            ]}
          />
        </View>
      </XStack>

      <XStack>
       {!showHeader && <Button
          iconAfter={<MoreHorizontal />}
          onPress={() => {
            actionSheetManagerRef.current?.open();
          }}
        />}
        <ActionSheet
          snapPoints={[33,25]}
          ref={actionSheetManagerRef}
          title={t('common:settings')}
          actions={[
            {
              name: t('common:view'),
              icon: <Eye size="$1" color="$color10" />,
              onPress: () => {
                actionSheetManagerRef.current?.close();
                router.push(`${getUrlPrefix}/vehicles/${vehicle.id}`)
                // router.push(`${getUrlPrefix}/companies/${user?.active_company?.id}/vehicles/${vehicle.id}`)
                //
              },
            },
            {
              name: t('common:edit'),
              icon: <Pencil size="$1" color="$color10" />,
              onPress: () => {
                actionSheetManagerRef.current?.close();
                router.push(`${getUrlPrefix}/company/vehicles/${vehicle.id}/edit`)
              },
            },
            {
              theme: 'error',
              name: t('common:delete'),
              icon: <Trash2 size="$1" color="$color10" />,
              onPress: () => {
                Alert.alert(
                  t('common:delete'),
                  t('common:confirm-delete'),
                  [
                    {
                      text: t('common:cancel'),
                      onPress: () => actionSheetManagerRef.current?.close(),
                      style: 'cancel',
                    },
                    {
                      text: t('common:remove'),
                      style: 'destructive',
                      onPress: () => {
                        actionSheetManagerRef.current?.close();
                        mutate();
                      },
                    },
                  ],
                );
              },
            },
          ]}
        />
      </XStack>
    </XStack>
  );
}


export default VehicleCard;
