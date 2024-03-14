import { Check, X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { CustomerShipmentsService, JobService } from '@zix/api';
import { BudgetShipment, DefinitionSender, HeaderShipment, OrderDescription, ShipmentCode, ShipmentDetails, ShipmentDirection, TotalCostOfShipment } from '@zix/features/shipments';
import { ZixLinkButton } from '@zix/ui/common';
import { t } from 'i18next';
import { RefreshControl } from 'react-native';
import { createParam } from 'solito';
import { ScrollView, Separator, XStack, YStack } from 'tamagui';

/* eslint-disable-next-line */
export interface ShipmentDetailsScreenProps {
}

const { useParam } = createParam<{ shipment: string }>();


export const ShipmentDetailsScreen: React.FC<ShipmentDetailsScreenProps> = () => {
  const [shipmentId] = useParam('shipment');
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['CustomerShipmentsService.retrieveShipment', { id: shipmentId }],
    queryFn: () => CustomerShipmentsService.retrieveShipment({ shipment: shipmentId || '' }),
  });
  const shipment = data?.data;

  


  
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      style={{
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 16,
      }}
    >
      <YStack gap="$3">
        <HeaderShipment
          shipmentType={`${t('shipment:type:'+shipment?.items_type)}` || ''}
          shipmentCreatedAt={shipment?.created_at || ''}
          demandJob={`${t('job:job-demand')}`}
          publishedJob={`${t('job:job-published')}`}
        />
        <TotalCostOfShipment shipment={shipment || {}} />
        <Separator borderColor={'$gray7'} width={'100%'} />
        <OrderDescription items={shipment?.items} />
        <Separator borderColor={'$gray7'} width={'100%'} />
        <ShipmentDirection shipment={shipment || {}} />
        <Separator borderColor={'$gray7'} width={'100%'} />
        <ShipmentDetails shipment={shipment || {}} paddingVertical="$4"/>
        <Separator borderColor={'$gray7'} width={'100%'} />
        <BudgetShipment shipment={shipment || {}} />
        <ShipmentCode codeId={shipment?.id || ''} marginVertical="$4" />
        <DefinitionSender shipment={shipment || {}} />
        <XStack width={'100%'} gap="$2" justifyContent="space-between">
          <ZixLinkButton
            href={`/`}
            icon={<Check size="$1" />}
            fontSize={15}
            fontWeight={'600'}
            paddingHorizontal="$8"
          >
            {t('shipment:shipment-accept')}
          </ZixLinkButton>
          <ZixLinkButton
            href={`/`}
            icon={<X size="$1" />}
            backgroundColor={'red'}
            color={'$color1'}
            fontSize={15}
            fontWeight={'600'}
            paddingHorizontal="$6"
          >
            {t('shipment:shipment-reject')}
          </ZixLinkButton>
        </XStack>
      </YStack>
    </ScrollView>
  );
}


export default ShipmentDetailsScreen;
