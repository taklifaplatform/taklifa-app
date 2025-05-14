import { Brush, CarFront, TextCursorInput } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { CompanyTransformer, CompanyVehiclesService, VehicleTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { MediaFile } from '@zix/ui/common';
import { ZixVariantOptionsWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'solito/router';

import { XStack, YStack } from 'tamagui';

export type CompanyVehiclesTabProps = {
  company: CompanyTransformer
}

export const CompanyVehiclesTab: React.FC<CompanyVehiclesTabProps> = ({
  company
}) => {
  const router = useRouter()
  const { getUrlPrefix } = useAuth()

  const { data } = useQuery({
    queryFn: () => CompanyVehiclesService.list({
      company: company.id as string,
    }),
    queryKey: ['CompanyVehiclesService.list', company.id],
  })


  function getVehicleImage(vehicle: VehicleTransformer) {
    return vehicle.images?.length ? vehicle.images[0] : vehicle.model?.map_icon;
  }

  return (
    <YStack gap='$2'>
      <ZixWidgetContainer label={t('common:vehicles')}>
        <FlatList
          data={data?.data || []}
          renderItem={({ item, index }) => (
            <XStack
              onPress={() => {
                router.push(`${getUrlPrefix}/companies/${company.id}/vehicles/${item.id}`)
              }}
              key={`${item.id}-${index}`}
              gap='$2'
              padding='$3'
              marginBottom='$4'
              borderRadius='$4'
              backgroundColor='$color2'
              alignItems='center'
            >
              <MediaFile media={getVehicleImage(item)} width='$10' height='$6' borderRadius='$4' heightQuality />
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
            </XStack>
          )}
        />
      </ZixWidgetContainer>
    </YStack>
  );
}

export default CompanyVehiclesTab;
