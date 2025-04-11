import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { SubmitButton, handleFormErrors } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import { useMemo } from 'react';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { ScrollView, Text, Theme, View, YStack } from 'tamagui';
import {
  ShipmentBudget,
  ShipmentDirection,
  ShipmentInformation
} from '../../../components';

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
      <YStack flex={1} padding="$4">
        <ScrollView
        showsVerticalScrollIndicator={false}
         flex={1}>
        <ZixWidgetContainer label={t('common:shipment-detail')}>
          <YStack>
            {shipment?.items?.map((item, index) => <Text>{item?.notes}</Text>)}
          </YStack>
        </ZixWidgetContainer>
        <ShipmentDirection shipment={shipment} />
        <ShipmentInformation shipment={shipment} paddingVertical="$4" />
        <ShipmentBudget shipment={shipment} />
        <View height="$6" />
      </ScrollView>
      </YStack>
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
