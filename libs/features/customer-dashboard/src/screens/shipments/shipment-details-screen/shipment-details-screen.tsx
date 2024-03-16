import { Check, X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { CustomerShipmentsService, DriversService } from '@zix/api';
import { BudgetShipment, DefinitionSender, HeaderShipment, InformationAboutDriver, OfferDescription, OrderDescription, ShipmentCanceledDetail, ShipmentCode, ShipmentDeliveringDetail, ShipmentDetails, ShipmentDirection, TotalCostOfShipment } from '@zix/features/shipments';
import { ZixLinkButton } from '@zix/ui/common';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { RefreshControl } from 'react-native';
import { createParam } from 'solito';
import { ScrollView, Separator, XStack, YStack } from 'tamagui';

export type ShipmentDetailsScreenProps = {
  urlPrefix?: string
}

const { useParam } = createParam<{ shipment: string }>();

export const ShipmentDetailsScreen: React.FC<ShipmentDetailsScreenProps> = ({
  urlPrefix = '/customer/shipments'
}) => {
  const [shipmentId] = useParam('shipment');
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['CustomerShipmentsService.retrieveShipment', { id: shipmentId }],
    queryFn: () => CustomerShipmentsService.retrieveShipment({ shipment: shipmentId || '' }),
  });
  const shipment = data?.data;
  // TODO:: remove this once it's been added to shipment
  const driverQuery = useQuery({
    queryKey: ['DriverShipmentsService.retrieveShipment', shipment?.user?.id],
    queryFn: () =>
      DriversService.retrieveDriver({
        driver: shipment?.user?.id || '',
      }),
  });

  // const driver = shipment.driver;
  const driver = driverQuery.data?.data || {};

  const status = shipment?.status;

  return (
    <>
      <AppHeader
        showBackButton
        title={`${t('job:job-demand')}`}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        style={{
          flex: 1,
        }}
      >
        <YStack gap="$3" padding='$4'>
          {status === 'cancelled' && <ShipmentCanceledDetail />}
          <HeaderShipment
            shipmentType={`${t('shipment:type:' + shipment?.items_type)}` || ''}
            shipmentCreatedAt={shipment?.created_at || ''}
            demandJob={`${t('job:job-demand')}`}
            publishedJob={`${t('job:job-published')}`}
          />
          <TotalCostOfShipment shipment={shipment || {}} />
          {status === 'delivering' && <ShipmentDeliveringDetail />}
          {status === 'delivering' && (
            <OfferDescription shipment={shipment || {}} />
          )}
          <Separator borderColor={'$gray7'} width={'100%'} />
          <OrderDescription items={shipment?.items} />
          <Separator borderColor={'$gray7'} width={'100%'} />
          <ShipmentDirection shipment={shipment || {}} status={status} />
          <Separator borderColor={'$gray7'} width={'100%'} />
          <ShipmentDetails shipment={shipment || {}} paddingVertical="$4" />
          <Separator borderColor={'$gray7'} width={'100%'} />
          {status === 'draft' && <BudgetShipment shipment={shipment || {}} />}
          {status === 'delivering' && <InformationAboutDriver driver={driver} />}

          <ShipmentCode codeId={shipment?.id || ''} marginVertical="$4" />
          <DefinitionSender shipment={shipment || {}} />
          <XStack flex={1} flexGrow={1} gap="$2" justifyContent="space-between">
            <ZixLinkButton
              href={`${urlPrefix}/${shipment?.id}/accept-shipment`}
              icon={<Check size="$1" />}
              fontSize={15}
              fontWeight={'600'}
              paddingHorizontal="$8"
            >
              {t('shipment:shipment-accept')}
            </ZixLinkButton>
            <ZixLinkButton
              href={`${urlPrefix}/${shipment?.id}/reject-shipment`}
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
    </>
  );
};

export default ShipmentDetailsScreen;
