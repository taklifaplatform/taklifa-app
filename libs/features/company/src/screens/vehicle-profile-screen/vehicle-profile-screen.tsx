
import { useMemo } from 'react';
import { createParam } from 'solito';

import { useQuery } from '@tanstack/react-query';
import { CompanyVehiclesService } from '@zix/api';
import { FullScreenSpinner } from '@zix/ui/common';
import { AppHeader } from '@zix/ui/layouts';
import { ZixMediasListWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import { RefreshControl } from 'react-native';
import { ScrollView, Text, XStack, YStack } from 'tamagui';


const { useParam } = createParam<{ company: string, vehicle: string }>();


export function VehicleProfileScreen() {
  const [companyId] = useParam('company');
  const [vehicleId] = useParam('vehicle');

  const { data, refetch, isLoading } = useQuery({
    queryFn() {
      if (!companyId || !vehicleId) {
        return;
      }

      return CompanyVehiclesService.retrieve({
        company: companyId,
        vehicle: vehicleId,
      });
    },
    queryKey: ['CompanyVehiclesService.retrieve', companyId, vehicleId],
  });

  const vehicleInfoRows = useMemo(() => ([
    {
      label: 'Vehicle type',
      value: data?.data?.model?.name || 'N/A'
    },
    {
      label: 'Model',
      value: data?.data?.model?.name || 'N/A'
    },
    {
      label: 'Year',
      value: data?.data?.year || 'N/A'
    },
    {
      label: 'Color',
      value: data?.data?.color || 'N/A'
    },
    {
      label: 'Plate number',
      value: data?.data?.plate_number || 'N/A'
    },
  ]), [data?.data])

  const renderVehicleInformation = () => data?.data && (
    <ScrollView flex={1} padding='$4' refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
      <ZixWidgetContainer
        label='Vehicle Images'
      >
        <ZixMediasListWidget
          medias={data.data.images || []}
          imageHeight='$10'
          imageWidth='$12'
        />
      </ZixWidgetContainer>

      <ZixWidgetContainer
        label='Vehicle Information'
      >
        <YStack gap='$2'>
          {
            vehicleInfoRows.map((row, index) => (
              <XStack
                key={index}
                backgroundColor='$color2'
                padding='$2'
                borderRadius='$2'
              >
                <Text minWidth='$14' fontWeight='700' color='$color12'>{row.label}</Text>
                <Text textAlign='right'>{row.value}</Text>
              </XStack>
            ))
          }
        </YStack>
      </ZixWidgetContainer>
    </ScrollView>
  )

  const renderLoadingSpinner = () => !data?.data?.id && <FullScreenSpinner />;

  return (
    <>
      <AppHeader title={data?.data?.name || 'Vehicle Info'} showBackButton />
      {renderLoadingSpinner()}
      {renderVehicleInformation()}
    </>
  )
}


export default VehicleProfileScreen;
