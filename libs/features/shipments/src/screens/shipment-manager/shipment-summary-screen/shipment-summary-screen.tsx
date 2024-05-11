import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { FullScreenSpinner } from '@zix/ui/common';
import { handleFormErrors, SubmitButton } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import { useMemo } from 'react';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { ScrollView, Text, Theme, View, YStack } from 'tamagui';
import {
  BudgetShipment,
  ShipmentCode,
  ShipmentDetails,
  ShipmentDirection,
} from '../../../components';
import { useAuth } from '@zix/services/auth';

const { useParam } = createParam<{ shipment: string }>();

export function ShipmentSummaryScreen() {
  const [shipmentId] = useParam('shipment');
  const toast = useToastController();
  const router = useRouter();
  const { getUrlPrefix } = useAuth();
  const { data } = useQuery({
    queryFn() {
      if (!shipmentId) {
        return { data: {} };
      }

      return ShipmentService.retrieveShipment({
        shipment: shipmentId,
      });
    },
    queryKey: ['ShipmentService.retrieveShipment', `-${shipmentId}`],
  });

  const shipment = useMemo(() => data?.data, [data]);

  const { mutateAsync } = useMutation({
    mutationFn: () =>
      ShipmentService.confirmShipment({
        shipment: shipmentId as string,
      }),
    onSuccess() {
      toast.show('Shipment confirmed');
      router.push(`${getUrlPrefix}/shipments`);
    },
    onError(error: any) {
      handleFormErrors(error?.body?.errors);
    },
  });

  const renderLoadingSpinner = () => !shipment && <FullScreenSpinner />;

  const renderShipmentSummary = () =>
    shipment?.id && (
      <ScrollView flex={1} padding="$4">
        <ZixWidgetContainer label="Shipment Detail">
          <YStack>
            {shipment.items?.map((item, index) => <Text>{item.notes}</Text>)}
          </YStack>
        </ZixWidgetContainer>
        <ShipmentDirection shipment={shipment} status={shipment.status} />
        <ShipmentDetails shipment={shipment} paddingVertical="$4" />
        <BudgetShipment shipment={shipment} />
        <View height="$6" />
      </ScrollView>
    );

  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader title="مراجعة البيانات" showBackButton />
      {renderLoadingSpinner()}
      {renderShipmentSummary()}

      <View paddingHorizontal='$4'>
        <Theme inverse>
          <SubmitButton
            onPress={() => {
              mutateAsync();
            }}
          >
            {t('common:confirm')}
          </SubmitButton>
        </Theme>
      </View>
    </ScreenLayout>
  );
}

export default ShipmentSummaryScreen;
