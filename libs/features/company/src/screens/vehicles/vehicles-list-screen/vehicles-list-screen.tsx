import { Brush, CarFront, TextCursorInput } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { CompanyVehiclesService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { MediaFile } from '@zix/ui/common';
import { ZixVariantOptionsWidget } from '@zix/ui/widgets';
import React from 'react';

import { FlatList } from 'react-native';
import { useRouter } from 'solito/router';
import { View, XStack, Text } from 'tamagui';


export function VehiclesListScreen() {
  const { user, getUrlPrefix } = useAuth()
  const router = useRouter()

  const { data, refetch, isLoading } = useQuery({
    queryFn: () => CompanyVehiclesService.list({
      company: user?.active_company?.id as string,
    }),
    queryKey: ['CompanyVehiclesService.list', user?.active_company?.id],
  })

  const renderItem = ({ item, index }) => (
    <XStack
      width='100%'
      onPress={() => {
        router.push(`${getUrlPrefix}/companies/${user?.active_company?.id}/vehicles/${item.id}`)
      }}
      key={`${item.id}-${index}`}
      // gap='$2'
      padding='$3'
      marginBottom='$4'
      borderRadius='$4'
      backgroundColor='$color2'
    >
      <MediaFile media={item.image} width='$10' height='$6' borderRadius='$4' heightQuality />
      <View flex={1}>
        <ZixVariantOptionsWidget
          optionVariant="location"
          variant="location"
          options={[
            {
              icons: <CarFront size="$1" color='$color11' />,
              value: item.name ?? 'N/A',
            },
            {
              icons: <TextCursorInput size="$1" color='$color11' />,
              value: item.plate_number ?? 'N/A',
            },
            {
              icons: <Brush size="$1" color='$color11' />,
              value: item.color ?? 'N/A',
            },

          ]}
        />
      </View>
    </XStack>
  )

  return (
    <FlatList
      refreshing={isLoading}
      onRefresh={refetch}
      style={{ flex: 1 }}
      data={data?.data || []}
      renderItem={renderItem}
    />
  );
}

export default VehiclesListScreen;
