import { useQuery } from '@tanstack/react-query';
import {
  CustomerShipmentsService,
  DriversService,
  ShipmentTransformer,
} from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner, UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader } from '@zix/ui/layouts';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import moment from 'moment';
import { useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { createParam } from 'solito';
import {
  ScrollView,
  Separator,
  Text,
  View,
  XStack,
  YStack
} from 'tamagui';
import {
  BudgetShipment,
  DefinitionSender,
  InformationAboutDriver,
  SectionWrapper,
  ShipmentCanceledDetail,
  ShipmentCardActions,
  ShipmentCode,
  ShipmentDeliveringDetail,
  ShipmentDetails,
  ShipmentDirection,
  TotalCostOfShipment
} from '../../components';

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

  const status = shipment?.status;

  const renderHeaderShipment = () => (
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
          SWDKSA{shipment?.id?.toString().substring(0, 8).toUpperCase()}
        </Text>
        <Text fontSize={18} fontWeight={'400'} color={'$color5'}>
          {t('job:job-demand')} {shipment?.items_type}
        </Text>
        <XStack alignItems="center" gap="$6" marginBottom="$3">
          <XStack gap="$2" alignItems="center" $sm={{ display: 'none' }}>
            {/* TODO change to UserAvatar */}

            <UserAvatar size={'$1'} user={shipment?.user} />
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
              {t('job:job-published')} {moment(shipment?.created_at).fromNow()}
            </Text>
          </XStack>
        </XStack>
      </YStack>

      <View $sm={{ display: 'none' }}>
        <ShipmentCardActions
          shipment={shipment}
          variant={variant}
          urlPrefix={urlPrefix}
          isDetail={true}
        />
      </View>
    </XStack>
  );

  const renderDescription = (
    items: Array<ShipmentTransformer>,
    label: string,
  ) => (
    <SectionWrapper>
      <ZixWidgetContainer label={t(label)}>
        <Text
          fontSize={15}
          fontWeight={'400'}
          color={'$gray9'}
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
          <ShipmentCanceledDetail status={shipment.status || 'darft'} />
          {renderHeaderShipment()}
          <TotalCostOfShipment shipment={shipment} />

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
