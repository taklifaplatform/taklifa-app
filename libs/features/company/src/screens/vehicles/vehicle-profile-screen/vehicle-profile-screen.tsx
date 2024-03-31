
import { useMemo } from 'react';
import { createParam } from 'solito';

import { useQuery } from '@tanstack/react-query';
import { CompanyVehiclesService } from '@zix/api';
import { FullScreenSpinner, MediaFile } from '@zix/ui/common';
import { AppHeader } from '@zix/ui/layouts';
import { ZixMediasListWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import { Dimensions, RefreshControl } from 'react-native';
import { ScrollView, Text, XStack, YStack } from 'tamagui';


const { useParam } = createParam<{ company: string, vehicle: string }>();

type VehicleRowInfo = {
  label: string;
  value: string | number;
}

type VehicleInfoSection = {
  label: string;
  items: VehicleRowInfo[];
}

const SCREEN_WIDTH = Dimensions.get('screen').width;

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

  const vehicle = useMemo(() => data?.data || {}, [data?.data])

  const vehicleInfoRows = useMemo<VehicleInfoSection[]>(() => ([
    {
      label: 'Vehicle Information',
      items: [
        {
          label: 'Vehicle type',
          value: vehicle.model?.name || 'N/A'
        },
        {
          label: 'Model',
          value: vehicle.model?.name || 'N/A'
        },
        {
          label: 'Year',
          value: vehicle.year || 'N/A'
        },
        {
          label: 'Color',
          value: vehicle.color || 'N/A'
        },
        {
          label: 'Plate number',
          value: vehicle.plate_number || 'N/A'
        },
      ]
    },
    {
      label: 'Vehicle Type',
      items: [
        {
          label: 'Body type',
          value: vehicle.information?.body_type || 'N/A'
        },
        {
          label: 'Steering wheel',
          value: vehicle.information?.steering_wheel || 'N/A'
        },
        {
          label: 'Doors count',
          value: vehicle.information?.doors_count || 'N/A'
        },
        {
          label: 'Seats count',
          value: vehicle.information?.seats_count || 'N/A'
        },
        {
          label: 'Top speed',
          value: vehicle.information?.top_speed || 'N/A'
        },
      ]
    },
    {
      label: 'Fuel Information',
      items: [
        {
          label: 'Fuel type',
          value: vehicle.fuel_information?.fuel_type || 'N/A'
        },
        {
          label: 'Fuel capacity',
          value: vehicle.fuel_information?.fuel_capacity || 'N/A'
        },
        {
          label: 'Liter per km in city',
          value: vehicle.fuel_information?.liter_per_km_in_city || 'N/A'
        },
        {
          label: 'Liter per km in highway',
          value: vehicle.fuel_information?.liter_per_km_in_highway || 'N/A'
        },
        {
          label: 'Liter per km mixed',
          value: vehicle.fuel_information?.liter_per_km_mixed || 'N/A'
        }
      ]
    },
    {
      label: 'Dimensions',
      items: [
        {
          label: 'Width',
          value: vehicle.capacity_dimensions?.width
            ? `${vehicle.capacity_dimensions?.width} (${vehicle.capacity_dimensions?.unit})`
            : 'N/A'
        },
        {
          label: 'Height',
          value: vehicle.capacity_dimensions?.height
            ? `${vehicle.capacity_dimensions?.height} (${vehicle.capacity_dimensions?.unit})`
            : 'N/A'
        },
        {
          label: 'Length',
          value: vehicle.capacity_dimensions?.length
            ? `${vehicle.capacity_dimensions?.length} (${vehicle.capacity_dimensions?.unit})`
            : 'N/A'
        },

        {
          label: 'Capacity',
          value: vehicle.capacity_weight?.value
            ? `${vehicle.capacity_weight?.value} (${vehicle.capacity_weight?.unit ?? 'kg'})`
            : 'N/A'
        },
      ]
    },
  ]), [vehicle])

  const renderVehicleInformation = () => data?.data && (
    <ScrollView flex={1} padding='$4' refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
      {
        vehicle.image && (
          <MediaFile
            media={vehicle.image}
            height='$14'
            width='100%'
            resizeMode='cover'
            borderRadius='$4'
          />
        )
      }

      <ZixWidgetContainer
        label='Vehicle Images'
      >
        <ZixMediasListWidget
          medias={data.data.images || []}
          imageHeight='$10'
          imageWidth='$12'
        />
      </ZixWidgetContainer>

      <YStack gap='$3'>
        {
          vehicleInfoRows.map((section, index) => (
            <ZixWidgetContainer
              key={`row-${index}`}
              label={section.label}
            >
              <YStack gap='$2'>
                {
                  section.items.map((row, index) => (
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
          ))
        }
      </YStack>


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
