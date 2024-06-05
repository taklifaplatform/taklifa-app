import { Eye } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import React from 'react';
import { Button, Text, XStack, YStack } from 'tamagui';
import { useShipmentHelper } from '../../hooks';
import { useRouter } from 'solito/router';

export type ShipmentInteractionProps = {
  shipment: ShipmentTransformer;
}

export const ShipmentInteraction: React.FC<ShipmentInteractionProps> = ({
  shipment,
  ...props
}) => {
  const router = useRouter()
  const { canViewShipmentInteractions } = useShipmentHelper({ shipment })

  const renderOptionActivity = (title: string, value: string | number) => (
    <XStack
      justifyContent="space-between"
    >
      <Text fontWeight='600'>
        {title}:
      </Text>

      <Text>
        {value}
      </Text>
    </XStack>
  );

  const renderRenderViewInteractionButton = () => canViewShipmentInteractions && (
    <Button size='$2' icon={Eye} onPress={() => router.push(`/app/shipment-manager/${shipment.id}/proposals`)}>
      View
    </Button>
  )

  return (
    <ZixWidgetContainer label='Activities in this shipment' collapsible={false} labelPrepend={renderRenderViewInteractionButton()}>
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
