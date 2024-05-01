import { ShipmentTransformer } from '@zix/api';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';
import { Stack, Text, View, XStack, YStack } from 'tamagui';

export type BudgetShipmentProps = {
  shipment: ShipmentTransformer;
}

export const BudgetShipment: React.FC<BudgetShipmentProps> = ({
  shipment,
  ...props
}) => {

  const renderOptionActivity = (title: string, value: string) => (
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

  const renderCardBudget = (title: string, value: number, currency: string) => (
    <YStack
      gap="$2"
      width={'30%'}
      height={100}
      backgroundColor='$color3'
      paddingVertical="$2"
      borderRadius="$4"
      alignItems="center"
      justifyContent='space-around'
    >
      <Text>
        {title}
      </Text>
      <Text fontSize='$8' fontWeight='bold'>
        {value}
      </Text>
      <Text >
        {currency}
      </Text>
    </YStack>
  );


  return (
    <ZixWidgetContainer label={t('job:budget')}>
      <XStack gap="$4" paddingVertical="$4">
        {renderCardBudget(
          t('shipment:lower'),
          shipment.min_budget?.value || 0,
          shipment.max_budget?.currency?.code || '',
        )}
        {renderCardBudget(
          t('shipment:medium'),
          ((shipment?.max_budget?.value || 0) +
            (shipment?.min_budget?.value || 0)) /
          2,
          shipment.max_budget?.currency?.code || '',
        )}
        {renderCardBudget(
          t('shipment:higher'),
          shipment.max_budget?.value || 0,
          shipment.max_budget?.currency?.code || '',
        )}
      </XStack>
      <YStack width="100%" gap="$3" marginTop="$3" paddingVertical="$4">
        <Stack alignItems="flex-start" marginBottom="$3">
          <Text fontSize={20} color={'$color'} fontWeight='bold'>
            {t('shipment:activity-in-this-presentation')}
          </Text>
        </Stack>
        <Stack
          flexDirection="column"
          gap="$3"
          $gtSm={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          {renderOptionActivity(t('job:Suggestions'), shipment.proposals_count)}
          {renderOptionActivity(t('shipment:conducting-interviews'), shipment.invitations_count)}
          {renderOptionActivity(
            t('shipment:invitation-have-been-sent'),
            shipment.pending_invitations_count,
          )}
          {renderOptionActivity(t('shipment:unanswered-invitations'), shipment.accepted_proposals_count)}
        </Stack>
      </YStack>
    </ZixWidgetContainer>
  );
};

export default BudgetShipment;
