
import { ZixAdvancedFilters } from '@zix/ui/common';
import { Image } from 'expo-image';
import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { VehicleModelService } from '@zix/api';
import { USER_ROLES } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';

export type MapFiltersTaklifaProps = {
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
  urgencyMode: boolean;
}


export const MapFiltersTaklifa: React.FC<MapFiltersTaklifaProps> = ({
  values,
  onChange,
  urgencyMode
}) => {
  const vehicleModelsQuery = useQuery({
    queryFn() {
      return VehicleModelService.list();
    },
    queryKey: ['VehicleModelService.list'],
  })

  const filters = useMemo(() => ([
    {
      key: 'vehicle_model',
      label: t('common:model'),
      options: [
        {
          label: `${t('common:model')}: ${t('app:common.all')}`,
          value: 'all',
          activeValue: (
            <CustomIcon name="solo_transporter_car" size='$2' color="$color1" />
          ),
          icon: (
            <CustomIcon name="solo_transporter_car" size='$2' color="$color1" />
          )
        },

        ...vehicleModelsQuery.data?.data?.map((item) => ({
          label: item.name ?? '',
          value: item.id ?? '',
          activeValue: (
            <Image
              source={{
                uri: item.map_icon?.original_url || item.map_icon?.url || '',
              }}
              style={{ width: 30, height: 30 }}
              contentFit='contain'
            />
          ),
          icon: (
            <Image
              source={{
                uri: item.map_icon?.original_url || item.map_icon?.url || '',
              }}
              style={{ width: 30, height: 30 }}
              contentFit='contain'
            />
          )
        })) || []
      ],
    },
    {
      key: 'provider_type',
      label: t('app:common.service-provider-type'),
      options: [
        {
          label: `${t('app:common.service-provider')}: ${t('app:common.all')}`,
          value: 'all',
          icon: (
            <CustomIcon name='service_provider' size='$2' />
          ),
          activeValue: (
            <CustomIcon name='service_provider' size='$2' />
          ),
        },
        {
          label: t('app:common.company'), value: 'company', icon: (
            <CustomIcon name='company_cars' size='$2' />
          ),
          activeValue: (
            <CustomIcon name='company_cars' size='$2' />
          ),
        },
        {
          label: t('app:common.solo-driver'), value: USER_ROLES.solo_driver, icon: (
            <CustomIcon name='solo_transporter_car' size='$2' />
          ),
          activeValue: (
            <CustomIcon name='solo_transporter_car' size='$2' />
          ),
        },
      ]
    },
  ]), [vehicleModelsQuery?.data?.data])


  return (
    <ZixAdvancedFilters
      filters={filters}
      values={values}
      onChange={onChange}
      urgencyMode={urgencyMode}
    />
  );
}


export default MapFiltersTaklifa;
