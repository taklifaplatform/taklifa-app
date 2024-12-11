
import { ShipmentTransformer } from '@zix/api';
import { t } from 'i18next';
import React from 'react';
import { Text, View } from 'tamagui';


export interface ShipmentStatusProps {
  shipment: ShipmentTransformer;
}


export const ShipmentStatus: React.FC<ShipmentStatusProps> = ({ shipment }) => {
  if (shipment.status !== 'cancelled') return null;
  return (
    <View backgroundColor={'#FFECEB'} padding={"$4"} borderRadius={"$6"} gap={"$2"} marginBottom={'$3'}>
      <Text textAlign='left' color={'red'} fontSize={20} fontWeight={'bold'}>
        {t('common:contract-removed')}
      </Text>
      <Text textAlign='left'>{t('common:contract-removed-message')}</Text>
    </View>
  );
}


export default ShipmentStatus;
