import { useQuery } from '@tanstack/react-query';
import {
  DriversService,
  ShipmentService,
  ShipmentTransformer,
} from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { AppHeader } from '@zix/ui/layouts';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import { useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { createParam } from 'solito';
import {
  ScrollView,
  Separator,
  Text,
  View,
  YStack
} from 'tamagui';
import {
  BudgetShipment,
  DefinitionSender,
  InformationAboutDriver,
  SectionWrapper,
  ShipmentCardActions,
  ShipmentCardHeader,
  ShipmentCode,
  ShipmentCost,
  ShipmentDeliveringDetail,
  ShipmentDetails,
  ShipmentDirection,
  ShipmentStatus,
} from '../../components';

export type ShipmentDetailScreenProps = {
  variant: 'shipments' | 'jobs';
};

const { useParam } = createParam<{ shipment: string }>();

export const ShipmentDetailScreen: React.FC<ShipmentDetailScreenProps> = ({
  variant = 'shipments',
}) => {
  const { activeRole, getUrlPrefix } = useAuth();

  const [shipmentId] = useParam('shipment');
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['ShipmentService.retrieveShipment', { id: shipmentId }],
    queryFn: () =>
      ShipmentService.retrieveShipment({ shipment: shipmentId || '' }),
  });
  const shipment = data?.data;
  // TODO:: remove this once it's been added to shipment
  const driverQuery = useQuery({
    queryKey: ['DriversService.retrieveDriver', shipment?.user?.id],
    queryFn: () =>
      DriversService.retrieveDriver({
        driver: shipment?.user?.id || '',
      }),
  });

  const urlPrefix = useMemo(() => {
    return `${getUrlPrefix}/${variant}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRole, variant]);
  // const driver = shipment.driver;
  const driver = driverQuery.data?.data || {};

  const status = shipment?.status;

  const renderDescription = (
    items: Array<ShipmentTransformer>,
    label: string,
  ) => (
    <SectionWrapper>
      <ZixWidgetContainer label={t(label)}>
        <Text
          fontSize={15}
          fontWeight={'400'}
          color={'$color9'}
          $sm={{
            fontSize: 13,
            fontWeight: '400',
          }}
        >
          {items?.map((item) => item.notes).join(', ')}
        </Text>
      </ZixWidgetContainer>
    </SectionWrapper>
  );

  const renderShipmentDetails = () =>
    !shipment ? (
      <FullScreenSpinner />
    ) : (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        style={{
          flex: 1,
        }}
      >
        <YStack gap="$3" padding="$4">
          <ShipmentStatus shipment={shipment} />

          <ShipmentCardHeader shipment={shipment} />

          <ShipmentCost shipment={shipment} />

          <ShipmentDeliveringDetail shipment={shipment} />

          {status === 'delivering' &&
            renderDescription(
              shipment?.items || [],
              'shipment:offer-description',
            )}

          <Separator
            borderColor={'$gray7'}
            width={'100%'}
            $gtSm={{ display: 'none' }}
          />
          {renderDescription(
            shipment?.items || [],
            'shipment:service-description',
          )}
          <Separator
            borderColor={'$gray7'}
            width={'100%'}
            $gtSm={{ display: 'none' }}
          />
          <ShipmentDirection shipment={shipment} status={status} />

          <Separator
            borderColor={'$gray7'}
            width={'100%'}
            $gtSm={{ display: 'none' }}
          />

          <ShipmentDetails shipment={shipment} paddingVertical="$4" />

          <Separator
            borderColor={'$gray7'}
            width={'100%'}
            $gtSm={{ display: 'none' }}
          />

          <BudgetShipment shipment={shipment} />

          <InformationAboutDriver driver={driver} status={status} />

          <ShipmentCode codeId={shipment?.id || ''} marginVertical="$4" />

          <DefinitionSender shipment={shipment} />

          <View>
            <ShipmentCardActions
              shipment={shipment}
              variant={variant}
              urlPrefix={urlPrefix}
              isDetail={true}
            />
          </View>
        </YStack>
      </ScrollView>
    );

  return (
    <>
      <AppHeader showBackButton title={t('job:job-demand')} />
      {renderShipmentDetails()}
    </>
  );
};

export default ShipmentDetailScreen;
