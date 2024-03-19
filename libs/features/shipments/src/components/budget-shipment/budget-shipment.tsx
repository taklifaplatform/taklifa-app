import { ShipmentTransformer } from '@zix/api';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';
import { Stack, Text, View, XStack, YStack } from 'tamagui';
import { SectionWrapper } from '../../screens/shipment-detail-screen/shipment-detail-screen';

export interface BudgetShipmentProps {
  shipment: ShipmentTransformer;
}

export const BudgetShipment: React.FC<BudgetShipmentProps> = ({
  shipment,
  ...props
}) => {
  if (shipment.status !== 'draft') return null;

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

  const renderCadrBudget = (title: string, value: number, currency: string) => (
    <YStack
      gap="$2"
      width={'30%'}
      height={100}
      backgroundColor={'$gray5'}
      padding="$4"
      borderRadius="$4"
      alignItems="center"
    >
      <Text color={'$gray9'} fontWeight={'400'}>
        {title}
      </Text>
      <Text fontSize={20} fontWeight={'800'}>
        {value}
      </Text>
      <Text fontSize={12} fontWeight={'600'}>
        {currency}
      </Text>
    </YStack>
  );
  return (
    <SectionWrapper>
      <ZixWidgetContainer label={t('job:budget')}>
        <XStack gap="$4" paddingVertical="$4">
          {renderCadrBudget(
            t('shipment:higher'),
            shipment.max_budget?.value || 0,
            shipment.max_budget?.currency?.code || '',
          )}
          {renderCadrBudget(
            t('shipment:medium'),
            ((shipment?.max_budget?.value || 0) +
              (shipment?.min_budget?.value || 0)) /
              2,
            shipment.max_budget?.currency?.code || '',
          )}
          {renderCadrBudget(
            t('shipment:lower'),
            shipment.min_budget?.value || 0,
            shipment.max_budget?.currency?.code || '',
          )}
        </XStack>
        <YStack width="100%" gap="$3" marginTop="$3" paddingVertical="$4">
          <Stack alignItems="flex-start" marginBottom="$3">
            <Text fontSize={20} color={'$color'} fontWeight={'600'}>
              {t('shipment:activity-in-this-presentation')}
            </Text>
          </Stack>
          <Stack
            flexDirection="column"
            gap="$3"
            $gtSm={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {renderOptionActivity(t('job:Suggestions'), 'Todo')}
            {renderOptionActivity(t('shipment:conducting-interviews'), 'Todo')}
            {renderOptionActivity(
              t('shipment:invitation-have-been-sent'),
              'Todo',
            )}
            {renderOptionActivity(t('shipment:unanswered-invitations'), 'Todo')}
          </Stack>
        </YStack>
      </ZixWidgetContainer>
    </SectionWrapper>
  );
};

export default BudgetShipment;
