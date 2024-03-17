import { useQuery } from '@tanstack/react-query';
import { CustomerShipmentsService, DriversService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { createParam } from 'solito';
import { ScrollView, Separator, YStack } from 'tamagui';
import { BudgetShipment, DefinitionSender, HeaderShipment, InformationAboutDriver, OfferDescription, OrderDescription, ShipmentActions, ShipmentCanceledDetail, ShipmentCode, ShipmentDeliveringDetail, ShipmentDetails, ShipmentDirection, TotalCostOfShipment } from '../../';


export type ShipmentDetailScreenProps = {
  variant: 'shipments' | 'jobs'
}

const { useParam } = createParam<{ shipment: string }>();


export const ShipmentDetailScreen: React.FC<ShipmentDetailScreenProps> = ({
  variant = 'shipments'
}) => {
  const { activeRole, getRoleUrlPrefix } = useAuth()

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

  const urlPrefix = useMemo(() => {
    return `${getRoleUrlPrefix(activeRole)}/${variant}`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRole, variant])
  // const driver = shipment.driver;
  const driver = driverQuery.data?.data || {};

  const status = shipment?.status;

  const renderShipmentDetails = () => !shipment ? <FullScreenSpinner /> : (
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
        <TotalCostOfShipment shipment={shipment} />
        {status === 'delivering' && <ShipmentDeliveringDetail />}
        {status === 'delivering' && (
          <OfferDescription shipment={shipment} />
        )}
        <Separator borderColor={'$gray7'} width={'100%'} />
        <OrderDescription items={shipment?.items} />
        <Separator borderColor={'$gray7'} width={'100%'} />
        <ShipmentDirection shipment={shipment} status={status} />
        <Separator borderColor={'$gray7'} width={'100%'} />
        <ShipmentDetails shipment={shipment} paddingVertical="$4" />
        <Separator borderColor={'$gray7'} width={'100%'} />
        {status === 'draft' && <BudgetShipment shipment={shipment} />}
        {status === 'delivering' && <InformationAboutDriver driver={driver} />}

        <ShipmentCode codeId={shipment?.id || ''} marginVertical="$4" />
        <DefinitionSender shipment={shipment} />
        <ShipmentActions
          shipment={shipment}
          variant={variant}
          urlPrefix={urlPrefix}
        />

      </YStack>
    </ScrollView>
  )

  return (
    <>
      <AppHeader
        showBackButton
        title={t('job:job-demand')}
      />
      {renderShipmentDetails()}
    </>
  );
}


export default ShipmentDetailScreen;
