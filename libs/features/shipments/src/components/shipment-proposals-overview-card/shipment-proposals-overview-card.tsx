
import { ShipmentTransformer } from '@zix/api';
import React from 'react';

import { View, Text } from 'react-native';

export type ShipmentProposalsOverviewCardProps = {
  shipment: ShipmentTransformer
}

export const ShipmentProposalsOverviewCard: React.FC<ShipmentProposalsOverviewCardProps> = ({
  shipment
}) => {
  return null
  return (
    <View>
      <Text>Welcome to shipment-proposals-overview-card!</Text>
    </View>
  );
}


export default ShipmentProposalsOverviewCard;
