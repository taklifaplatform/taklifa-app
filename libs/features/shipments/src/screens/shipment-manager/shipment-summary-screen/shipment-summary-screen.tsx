import { Button, ScrollView, YStack, Text, View } from 'tamagui';
import { createParam } from 'solito';
import { useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { DebugObject, FullScreenSpinner } from '@zix/ui/common';
import { AppHeader } from '@zix/ui/layouts';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { useMemo } from 'react';
import { ShipmentDetails, ShipmentDirection } from '../../../components';

const { useParam } = createParam<{ shipment: string }>();

export function ShipmentSummaryScreen() {
  const [shipmentId] = useParam('shipment');
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
  })

  const shipment = useMemo(() => data?.data, [data])

  const renderLoadingSpinner = () => !shipment && (
    <FullScreenSpinner />
  )

  const renderShipmentSummary = () => shipment?.id && (
    <ScrollView flex={1} padding='$4'>
      <ZixWidgetContainer
        label='Shipment Detail'
      >
        <YStack>
          {
            shipment.items?.map((item, index) => (
              <Text>
                {item.notes}
              </Text>
            ))
          }
        </YStack>
      </ZixWidgetContainer>
      <ShipmentDirection shipment={shipment} status={shipment.status} />
      <ShipmentDetails shipment={shipment} paddingVertical="$4" />

      <View height='$6' />
      <DebugObject object={shipment} />



    </ScrollView>
  )

  return (
    <>
      <AppHeader
        title='مراجعة البيانات'
        showBackButton
      />
      {renderLoadingSpinner()}
      {renderShipmentSummary()}
    </>
  );
}

export default ShipmentSummaryScreen;
