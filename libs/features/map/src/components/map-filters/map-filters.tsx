
import { MediaAvatar, ZixAdvancedFilters } from '@zix/ui/common';
import { useMemo } from 'react';

import { CarFront } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { VehicleModelService } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { USER_ROLES } from '@zix/services/auth';
import { t } from 'i18next';

export type MapFiltersProps = {
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
}


export const MapFilters: React.FC<MapFiltersProps> = ({
  values,
  onChange,
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
          label: t('app:common.all'),
          value: 'all',
          activeValue: (
            <CustomIcon name="solo_transporter_car" size='$4' color="$color9" />
          ),
          icon: (
            <CustomIcon name="solo_transporter_car" size='$4' color="$color9" />
          )
        },

        ...vehicleModelsQuery.data?.data?.map((item) => ({
          label: item.name ?? '',
          value: item.id ?? '',
          activeValue: (
            <MediaAvatar
              media={item.map_icon}
              size='$4'
            />
          ),
          icon: (
            <MediaAvatar
              media={item.map_icon}
              size='$4'
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
          label: t('app:common.all'), value: 'all',
          icon: (
            <CustomIcon name='service_provider' size='$4' />
          ),
          activeValue: (
            <CustomIcon name='service_provider' size='$4' />
          ),
        },
        {
          label: t('app:common.company'), value: 'company', icon: (
            <CustomIcon name='company_cars' size='$4' />
          ),
          activeValue: (
            <CustomIcon name='company_cars' size='$4' />
          ),
        },
        {
          label: t('app:common.solo-driver'), value: USER_ROLES.solo_driver, icon: (
            <CustomIcon name='solo_transporter_car' size='$4' />
          ),
          activeValue: (
            <CustomIcon name='solo_transporter_car' size='$4' />
          ),
        },
      ]
    },
    // {
    //   key: 'rating',
    //   label: 'Rating',
    //   options: [
    //     { label: 'All', value: 'all' },
    //     { label: '1', value: '1' },
    //     { label: '2', value: '2' },
    //     { label: '3', value: '3' },
    //     { label: '4', value: '4' },
    //     { label: '5', value: '5' },
    //   ]
    // },
    // // working days
    // {
    //   key: 'working_days',
    //   label: 'Working Days',
    //   options: [
    //     { label: 'All', value: 'all' },
    //     { label: 'Mon', value: 'mon' },
    //     { label: 'Tue', value: 'tue' },
    //     { label: 'Wed', value: 'wed' },
    //     { label: 'Thu', value: 'thu' },
    //     { label: 'Fri', value: 'fri' },
    //     { label: 'Sat', value: 'sat' },
    //     { label: 'Sun', value: 'sun' },
    //   ]
    // },
  ]), [vehicleModelsQuery?.data?.data])


  return (
    <ZixAdvancedFilters
      filters={filters}
      values={values}
      onChange={onChange}
    />
  );
}


export default MapFilters;
