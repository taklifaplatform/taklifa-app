import React, { useState, useRef } from 'react';
import { Eye, Pencil, Send, Trash2, UsersRound } from '@tamagui/lucide-icons';
import { ShipmentService, ShipmentTransformer } from '@zix/api';
import { ActionSheet, ActionSheetRef } from '@zix/ui/common';
import { useAuth } from '@zix/services/auth';
import { t } from 'i18next';
import { useRouter } from 'solito/router';
import { useShipmentHelper } from '../../hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useToastController } from '@tamagui/toast';
import { Platform } from 'react-native';
import { View } from 'tamagui';

export type ShipmentOwnerActionsProps = {
  shipment: ShipmentTransformer;
  children: ({ onPress }: { onPress: () => void }) => React.ReactNode;
};

export const ShipmentOwnerActions: React.FC<ShipmentOwnerActionsProps> = ({ shipment, children }) => {
  const router = useRouter();
  const toast = useToastController();
  const queryClient = useQueryClient();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { getUrlPrefix } = useAuth();
  const { isAuthOwner } = useShipmentHelper({ shipment });
  const [dropdownVisible, setDropdownVisible] = useState(false); // For web dropdown visibility
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // To track which item is hovered

  const { mutateAsync } = useMutation({
    mutationFn: () => ShipmentService.destroyShipment({ shipment: shipment.id }),
    onSuccess(data) {
      toast.show('Shipment deleted successfully', { preset: 'success' });
      queryClient.refetchQueries({ queryKey: ['ShipmentService.fetchAllShipment'] });
      router.push(`${getUrlPrefix}/shipments`);
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
    },
  });

  if (!isAuthOwner) return null;

  // Define actions for both ActionSheet and web dropdown
  const actions = [
    {
      name: t('plain:View Request'),
      icon: <Eye size="$2" color="$color10" />,
      onPress: () => router.push(`${getUrlPrefix}/shipments/${shipment.id}`),
    },
    {
      name: t('plain:View Proposals'),
      icon: <UsersRound size="$2" color="$color10" />,
      onPress: () => router.push(`${getUrlPrefix}/shipment-manager/${shipment.id}/proposals`),
    },
    {
      name: t('plain:View Invitations'),
      icon: <Send size="$2" color="$color10" />,
      onPress: () => router.push(`${getUrlPrefix}/shipment-manager/${shipment.id}/invitations`),
    },
    {
      name: t('plain:Edit'),
      icon: <Pencil size="$2" color="$color10" />,
      onPress: () => router.push(`${getUrlPrefix}/shipment-manager/${shipment.id}`),
    },
    {
      name: t('plain:Delete'),
      icon: <Trash2 size="$2" color="$color10" />,
      onPress: () =>
        Alert.alert(t('plain:Delete Shipment'), t('plain:Are you sure you want to delete this shipment?'), [
          { text: t('plain:Cancel'), style: 'cancel' },
          {
            text: t('plain:Delete'),
            onPress: mutateAsync,
            style: 'destructive',
          },
        ]),
    },
  ];

  const handleSettingsClick = () => {
    if (Platform.OS === 'web') {
      setDropdownVisible(!dropdownVisible); // Toggle visibility for web
    } else {
      actionSheetRef.current?.open();
    }
  };

  const renderWebDropdown = () => (
    <View
      width={180}
      position='absolute'
      zIndex={1}
      backgroundColor='white'
      left={0}
      top={50}
      borderWidth={1.5}
      borderRadius={5}
    >
      {actions.map((action, index) => (
        <View
          key={index}
          onPress={action.onPress}
          borderBottomWidth={0.5}
          backgroundColor={hoveredIndex === index ? 'black' : 'white'}
          cursor='pointer'
          padding={10}
          style={{
            color: hoveredIndex === index ? 'white' : 'black', // Change text color on hover
          }}
          onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
          onMouseLeave={() => setHoveredIndex(null)} // Reset hover on mouse leave
        >
          {action.name}
        </View>
      ))}
    </View>
  )

  return (
    <>
      {children({ onPress: handleSettingsClick })}

      {/* For mobile platforms (iOS/Android) */}
      {Platform.OS !== 'web' && (
        <ActionSheet ref={actionSheetRef} title={t('plain:Select an action')} snapPoints={[50, 50]} actions={actions} />
      )}

      {/* For web platform */}
      {Platform.OS === 'web' && dropdownVisible && (
        renderWebDropdown()
      )}
    </>
  );
};

export default ShipmentOwnerActions;
