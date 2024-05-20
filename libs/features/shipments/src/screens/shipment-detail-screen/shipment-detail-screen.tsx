import { useQuery } from '@tanstack/react-query';
import { DriversService, ShipmentService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { ZixMapDirectionWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import { useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { createParam } from 'solito';
import { ScrollView, Text, View, YStack } from 'tamagui';
import {
  ShipmentBudget,
  ShipmentCardActions,
  ShipmentCardHeader,
  ShipmentCost,
  ShipmentDeliveringDetail,
  ShipmentDirection,
  ShipmentInformation,
  ShipmentInteraction,
  ShipmentSectionWrapper,
  ShipmentStatus
} from '../../components';

export type ShipmentDetailScreenProps = {
  variant: 'shipments' | 'jobs';
};

const { useParam } = createParam<{ shipment: string; job: string }>();

export const ShipmentDetailScreen: React.FC<ShipmentDetailScreenProps> = ({
  variant = 'shipments',
}) => {
  const { activeRole, getUrlPrefix } = useAuth();

  const [shipmentId] = useParam(variant === 'shipments' ? 'shipment' : 'job');
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

          <ShipmentSectionWrapper>
            <ZixWidgetContainer label={t('shipment:service-description')}>
              <YStack gap="$2">
                {shipment?.items?.map((item, index) => (
                  <Text key={`shipment-note-${item.id}-${index}`}>
                    {item.notes}
                  </Text>
                ))}
              </YStack>
            </ZixWidgetContainer>
          </ShipmentSectionWrapper>

          <ShipmentSectionWrapper hideSeparator>
            <ShipmentDirection shipment={shipment} />
          </ShipmentSectionWrapper>

          <ShipmentSectionWrapper>
            <ZixMapDirectionWidget
              startLocation={shipment.from_location || {}}
              endLocation={shipment.to_location || {}}
              status={shipment.status}
            />
          </ShipmentSectionWrapper>

          <ShipmentSectionWrapper>
            <ShipmentInformation shipment={shipment} />
          </ShipmentSectionWrapper>

          <ShipmentSectionWrapper>
            <ShipmentBudget shipment={shipment} />
          </ShipmentSectionWrapper>

          <ShipmentSectionWrapper>
            <ShipmentInteraction shipment={shipment} />
          </ShipmentSectionWrapper>

          {/* <InformationAboutDriver driver={driver} status={status} /> */}

          {/* <ShipmentCode codeId={shipment?.id || ''} marginVertical="$4" /> */}

          {/* <DefinitionSender shipment={shipment} /> */}

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
    <ScreenLayout>
      <AppHeader showBackButton title={t('job:job-demand')} />
      {renderShipmentDetails()}
    </ScreenLayout>
  );
};

export default ShipmentDetailScreen;
