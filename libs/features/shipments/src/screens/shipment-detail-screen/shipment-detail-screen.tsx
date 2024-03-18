import { useQuery } from '@tanstack/react-query';
import { CustomerShipmentsService, DriversService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner, UserAvatar } from '@zix/ui/common';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { createParam } from 'solito';
import {
  ScrollView,
  Separator,
  YStack,
  Text,
  Stack,
  XStack,
  View,
} from 'tamagui';
import {
  BudgetShipment,
  DefinitionSender,
  HeaderShipment,
  InformationAboutDriver,
  OfferDescription,
  OrderDescription,
  ShipmentActions,
  ShipmentCanceledDetail,
  ShipmentCode,
  ShipmentDeliveringDetail,
  ShipmentDetails,
  ShipmentDirection,
  TotalCostOfShipment,
} from '../../';
import moment from 'moment';
import { CustomIcon } from '@zix/ui/icons';
import { ZixWidgetContainer } from '@zix/ui/widgets';

export type ShipmentDetailScreenProps = {
  variant: 'shipments' | 'jobs';
};

const { useParam } = createParam<{ shipment: string }>();

export const ShipmentDetailScreen: React.FC<ShipmentDetailScreenProps> = ({
  variant = 'shipments',
}) => {
  const { activeRole, getRoleUrlPrefix } = useAuth();

  const [shipmentId] = useParam('shipment');
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['CustomerShipmentsService.retrieveShipment', { id: shipmentId }],
    queryFn: () =>
      CustomerShipmentsService.retrieveShipment({ shipment: shipmentId || '' }),
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
    return `${getRoleUrlPrefix(activeRole)}/${variant}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRole, variant]);
  // const driver = shipment.driver;
  const driver = driverQuery.data?.data || {};

  // const status = shipment?.status;
  const status = 'delivering';

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
          {status === 'cancelled' && <ShipmentCanceledDetail />}
          <XStack
            justifyContent="space-between"
            alignItems="center"
            $gtSm={{
              backgroundColor: '$gray3',
              padding: '$5',
              borderRadius: '$4',
            }}
          >
            <YStack gap="$3" alignItems="flex-start">
              <Text fontSize={12} fontWeight={'600'} color={'$color11'}>
                SWDKSA{shipment.id?.toString().substring(0, 8).toUpperCase()}
              </Text>
              <Text fontSize={18} fontWeight={'400'} color={'$color5'}>
                {t('job:job-demand')} {shipment?.items_type}
              </Text>
              <XStack alignItems="center" gap="$6" marginBottom="$3">
                <XStack gap="$2" alignItems="center" $sm={{ display: 'none' }}>
                  {/* TODO change to UserAvatar */}

                  <UserAvatar size={'$1'} user={shipment.user} />
                  <Text
                    fontSize={12}
                    fontWeight={'600'}
                    color={'$gray9'}
                    $sm={{
                      fontSize: 12,
                      fontWeight: '600',
                    }}
                  >
                    {shipment.user?.name}
                  </Text>
                </XStack>
                <XStack gap="$2" alignItems="center">
                  <CustomIcon
                    name="chronic"
                    size="$1"
                    $sm={{
                      display: 'none',
                    }}
                  />
                  <Text
                    fontSize={12}
                    fontWeight={'600'}
                    color={'$gray9'}
                    $sm={{
                      fontSize: 9,
                      fontWeight: '600',
                    }}
                  >
                    {t('job:job-published')}{' '}
                    {moment(shipment.created_at).fromNow()}
                  </Text>
                </XStack>
              </XStack>
            </YStack>
            <View $sm={{ display: 'none' }}>
              <ShipmentActions
                shipment={shipment}
                variant={variant}
                urlPrefix={urlPrefix}
              />
            </View>
          </XStack>
          <TotalCostOfShipment shipment={shipment} />
          {status === 'delivering' && <ShipmentDeliveringDetail shipment={shipment} />}
          {status === 'delivering' && (
            <Stack
              padding="$3"
              backgroundColor={'$color1'}
              borderRadius={'$4'}
              $sm={{ backgroundColor: 'transparent' }}
            >
              <OfferDescription shipment={shipment} />
            </Stack>
          )}
          <Separator
            borderColor={'$gray7'}
            width={'100%'}
            $gtSm={{ display: 'none' }}
          />
          <Stack
            padding="$3"
            backgroundColor={'$color1'}
            borderRadius={'$4'}
            $sm={{ backgroundColor: 'transparent' }}
          >
            <OrderDescription items={shipment?.items} />
          </Stack>
          <Separator
            borderColor={'$gray7'}
            width={'100%'}
            $gtSm={{ display: 'none' }}
          />
          <Stack
            padding="$3"
            backgroundColor={'$color1'}
            borderRadius={'$4'}
            $sm={{ backgroundColor: 'transparent' }}
          >
            <ShipmentDirection shipment={shipment} status={status} />
          </Stack>
          <Separator
            borderColor={'$gray7'}
            width={'100%'}
            $gtSm={{ display: 'none' }}
          />
          <Stack
            padding="$3"
            backgroundColor={'$color1'}
            borderRadius={'$4'}
            $sm={{ backgroundColor: 'transparent' }}
          >
            <ShipmentDetails shipment={shipment} paddingVertical="$4" />
          </Stack>
          <Separator
            borderColor={'$gray7'}
            width={'100%'}
            $gtSm={{ display: 'none' }}
          />
          {status === 'draft' && (
            <Stack
              padding="$3"
              backgroundColor={'$color1'}
              borderRadius={'$4'}
              $sm={{ backgroundColor: 'transparent' }}
            >
              <BudgetShipment shipment={shipment} />
            </Stack>
          )}
          {status === 'delivering' && (
            <Stack
              padding="$3"
              backgroundColor={'$color1'}
              borderRadius={'$4'}
              $sm={{ backgroundColor: 'transparent' }}
            >
              <InformationAboutDriver driver={driver} />
            </Stack>
          )}
          <ShipmentCode codeId={shipment?.id || ''} marginVertical="$4" />
          <Stack
            padding="$3"
            backgroundColor={'$color1'}
            borderRadius={'$4'}
            $sm={{ backgroundColor: 'transparent' }}
          >
            <DefinitionSender shipment={shipment} />
          </Stack>
          <View>
            <ShipmentActions
              shipment={shipment}
              variant={variant}
              urlPrefix={urlPrefix}
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
