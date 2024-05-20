import { ShipmentTransformer } from '@zix/api';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';
import { Text, View, XStack, YStack } from 'tamagui';

export type ShipmentInteractionProps = {
  shipment: ShipmentTransformer;
}

export const ShipmentInteraction: React.FC<ShipmentInteractionProps> = ({
  shipment,
  ...props
}) => {

  const renderOptionActivity = (title: string, value: string | number) => (
    <XStack
      justifyContent="space-between"
      $gtSm={{ gap: '$4', justifyContent: 'flex-start' }}
    >
      <View>
        <Text fontSize={15} color={'$color'} fontWeight={'400'}>
          {title}:
        </Text>
      </View>

      <View width={50} alignItems="flex-start">
        <Text fontSize={15} color={'$color'} fontWeight={'400'}>
          {value}
        </Text>
      </View>
    </XStack>
  );


  return (
    <ZixWidgetContainer label='Activities in this shipment' collapsible={false}>
      <YStack gap='$3'>
        {renderOptionActivity('Proposals', shipment.proposals_count ?? 0)}
        {renderOptionActivity('Invitations', shipment.invitations_count ?? 0)}
        {renderOptionActivity(
          'Non answered invitations',
          shipment.pending_invitations_count ?? 0,
        )}
        {renderOptionActivity('Interviewing', shipment.accepted_proposals_count ?? 0)}
      </YStack>
    </ZixWidgetContainer>
  );
};

export default ShipmentInteraction;
