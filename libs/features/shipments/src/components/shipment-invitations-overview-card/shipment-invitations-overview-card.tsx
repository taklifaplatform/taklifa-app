
import { ShipmentTransformer } from '@zix/api';
import React from 'react';

import { View, Text } from 'tamagui';

export type ShipmentInvitationsOverviewCardProps = {
  shipment: ShipmentTransformer
}

export const ShipmentInvitationsOverviewCard: React.FC<ShipmentInvitationsOverviewCardProps> = ({
  shipment
}) => {
  return null
  return (
    <View>
      <Text>You have sent {shipment.invitations_count} invitations</Text>
    </View>
  );
}


export default ShipmentInvitationsOverviewCard;
