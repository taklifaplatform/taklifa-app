import { ShipmentTransformer } from '@zix/api';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';
import { Stack, Text, View, XStack, YStack } from 'tamagui';
import { SectionWrapper } from '../../screens/shipment-detail-screen/shipment-detail-screen';

/* eslint-disable-next-line */
export interface BudgetShipmentProps {
  shipment: ShipmentTransformer;
}

export const BudgetShipment: React.FC<BudgetShipmentProps> = ({ shipment, ...props }) => {
  if(shipment.status !== 'draft') return null
  return (
    <SectionWrapper>
    <ZixWidgetContainer label={t('job:budget')} >
      <XStack gap="$4" paddingVertical='$4'>
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
            {t('shipment:higher')}
          </Text>
          <Text fontSize={20} fontWeight={'800'}>
            {shipment.max_budget?.value}
          </Text>
          <Text fontSize={12} fontWeight={'600'}>
            {shipment.max_budget?.currency?.code}
          </Text>
        </YStack>
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
            {t('shipment:medium')}
          </Text>
          <Text fontSize={20} fontWeight={'800'}>
            {(shipment?.max_budget?.value + shipment?.min_budget?.value) / 2}
          </Text>
          <Text fontSize={12} fontWeight={'600'}>
            {shipment.max_budget?.currency?.code}
          </Text>
        </YStack>
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
            {t('shipment:lower')}
          </Text>
          <Text fontSize={20} fontWeight={'800'}>
            {shipment.min_budget?.value}
          </Text>
          <Text fontSize={12} fontWeight={'600'}>
            {shipment.max_budget?.currency?.code}
          </Text>
        </YStack>
      </XStack>
      <YStack width="100%" gap="$3" marginTop="$3" paddingVertical='$4'>
        <Stack alignItems="flex-start" marginBottom="$3">
          <Text fontSize={20} color={'$color'} fontWeight={'600'}>
            {t('shipment:activity-in-this-presentation')}
          </Text>
        </Stack>

        <XStack justifyContent="space-between">
          <View>
            <Text fontSize={15} color={'$color'} fontWeight={'400'}>
              {t('job:Suggestions')}:
            </Text>
          </View>

          <View width={50} alignItems="flex-start">
            <Text fontSize={15} color={'$color'} fontWeight={'400'}>
              Todo
            </Text>
          </View>
        </XStack>
        <XStack justifyContent="space-between">
          <Text fontSize={15} color={'$color'} fontWeight={'400'}>
            {t('shipment:conducting-interviews')}:
          </Text>
          <View width={50} alignItems="flex-start">
            <Text
              fontSize={15}
              color={'$color'}
              fontWeight={'400'}
              textAlign="right"
            >
              Todo
            </Text>
          </View>
        </XStack>
        <XStack justifyContent="space-between">
          <View>
            <Text fontSize={15} color={'$color'} fontWeight={'400'}>
              {t('shipment:invitation-have-been-sent')}:
            </Text>
          </View>
          <View width={50} alignItems="flex-start">
            <Text fontSize={15} color={'$color'} fontWeight={'400'}>
              Todo
            </Text>
          </View>
        </XStack>
        <XStack justifyContent="space-between">
          <Text fontSize={15} color={'$color'} fontWeight={'400'}>
            {t('shipment:unanswered-invitations')}:
          </Text>
          <View width={50} alignItems="flex-start">
            <Text fontSize={15} color={'$color'} fontWeight={'400'}>
              Todo
            </Text>
          </View>
        </XStack>
      </YStack>
    </ZixWidgetContainer>
    </SectionWrapper>
  );
};

export default BudgetShipment;
