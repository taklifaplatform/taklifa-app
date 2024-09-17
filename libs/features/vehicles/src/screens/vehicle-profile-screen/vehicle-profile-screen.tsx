
import { useMemo } from 'react';
import { createParam } from 'solito';

import { useQuery } from '@tanstack/react-query';
import { CompanyVehiclesService } from '@zix/api';
import { FullScreenSpinner, MediaFile } from '@zix/ui/common';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { ZixMediasListWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import { Dimensions, RefreshControl } from 'react-native';
import { ScrollView, Text, View, XStack, YStack } from 'tamagui';
import { t } from 'i18next';


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
      label: t('common:vehicle-information'),
      items: [
        {
          label: t('common:model'),
          value: vehicle.model?.name || 'N/A'
        },
        {
          label: t('common:year'),
          value: vehicle.year || 'N/A'
        },
        {
          label: t('common:color'),
          value: vehicle.color || 'N/A'
        },
        {
          label: t('common:plate-number'),
          value: vehicle.plate_number || 'N/A'
        },
      ]
    },
    {
      label: t('common:vehicle-type'),
      items: [
        {
          label: t('common:body-type'),
          value: vehicle.information?.body_type || 'N/A'
        },
        {
          label: t('common:steering-wheel'),
          value: vehicle.information?.steering_wheel || 'N/A'
        },
        {
          label: t('common:doors-count'),
          value: vehicle.information?.doors_count || 'N/A'
        },
        {
          label: t('common:seats-count'),
          value: vehicle.information?.seats_count || 'N/A'
        },
        {
          label: t('common:top-speed'),
          value: vehicle.information?.top_speed || 'N/A'
        },
      ]
    },
    {
      label: t('common:fuel-information'),
      items: [
        {
          label: t('common:fuel-type'),
          value: vehicle.fuel_information?.fuel_type || 'N/A'
        },
        {
          label: t('common:fuel-capacity'),
          value: vehicle.fuel_information?.fuel_capacity || 'N/A'
        },
        {
          label: t('common:liter-per-km-in-city'),
          value: vehicle.fuel_information?.liter_per_km_in_city || 'N/A'
        },
        {
          label: t('common:liter-per-km-in-highway'),
          value: vehicle.fuel_information?.liter_per_km_in_highway || 'N/A'
        },
        {
          label: t('common:liter-per-km-in-combined'),
          value: vehicle.fuel_information?.liter_per_km_mixed || 'N/A'
        }
      ]
    },
    {
      label: t('common:dimensions'),
      items: [
        {
          label: t('common:width'),
          value: vehicle.capacity_dimensions?.width
            ? `${vehicle.capacity_dimensions?.width} (${vehicle.capacity_dimensions?.unit})`
            : 'N/A'
        },
        {
          label: t('common:height'),
          value: vehicle.capacity_dimensions?.height
            ? `${vehicle.capacity_dimensions?.height} (${vehicle.capacity_dimensions?.unit})`
            : 'N/A'
        },
        {
          label: t('common:length'),
          value: vehicle.capacity_dimensions?.length
            ? `${vehicle.capacity_dimensions?.length} (${vehicle.capacity_dimensions?.unit})`
            : 'N/A'
        },

        {
          label: t('common:capacity-volume'),
          value: vehicle.capacity_weight?.value
            ? `${vehicle.capacity_weight?.value} (${vehicle.capacity_weight?.unit ?? 'kg'})`
            : 'N/A'
        },
      ]
    },
  ]), [vehicle])

  const renderVehicleInformation = () => data?.data && (
    <ScrollView flex={1} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
      <YStack gap='$3' padding='$4'>
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
          label={t('common:images')}
        >
          <ZixMediasListWidget
            medias={data.data.images || []}
            imageHeight='$10'
            imageWidth='$12'
          />
        </ZixWidgetContainer>
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
                      <View flex={0.6}>
                        <Text textAlign='left' fontWeight='700' color='$color12'>{row.label}</Text>
                      </View>
                      <View flex={0.4}>
                        <Text textAlign='left'>{row.value}</Text>
                      </View>
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
    <ScreenLayout>
      <AppHeader title={t('common:vehicle-information')} showBackButton />
      {renderLoadingSpinner()}
      {renderVehicleInformation()}
    </ScreenLayout>
  )
}


export default VehicleProfileScreen;
