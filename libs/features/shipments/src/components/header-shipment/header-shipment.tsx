import { ShipmentTransformer } from '@zix/api';
import moment from 'moment';
import React from 'react';
import { Stack, Text, YStack } from 'tamagui';

/* eslint-disable-next-line */
export interface HeaderShipmentProps {
  demandJob: string;
  publishedJob: string;
  shipmentType: string;
  shipmentCreatedAt: string;
}

export const HeaderShipment: React.FC<HeaderShipmentProps> = ({
  demandJob,
  publishedJob,
  shipmentType,
  shipmentCreatedAt,
}) => {
  return (
    // <ZixWidgetContainer>
    <YStack gap="$3" alignItems="flex-start">
      <Text fontSize={18} fontWeight={'400'} color={'$color'}>
        {demandJob} {shipmentType}
      </Text>
      <Stack flexDirection="column" gap="$2" marginBottom="$3">
        <Text fontSize={9} fontWeight={'600'} color={'$gray9'}>
          {publishedJob} {moment(shipmentCreatedAt).fromNow()}
        </Text>
      </Stack>
    </YStack>
    // </ZixWidgetContainer>
  );
};

export default HeaderShipment;
