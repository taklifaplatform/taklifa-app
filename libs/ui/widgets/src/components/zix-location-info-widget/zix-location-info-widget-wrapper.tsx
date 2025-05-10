
import { LocationService, LocationTransformer } from '@zix/api';
import React, { useState } from 'react';

import { Pencil } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocationManager } from '@zix/services/location';
import { ZixButton } from '@zix/ui/common';
import { t } from 'i18next';
import { View } from 'tamagui';
import ZixWidgetContainer from '../zix-widget-container/zix-widget-container';

export type ZixLocationInfoWidgetWrapperProps = {
  locationId?: string;
  canEdit?: boolean;
  children?: (location: LocationTransformer) => React.ReactNode;
  onAddNewLocation?: (location: LocationTransformer) => Promise<string>;
}

export const ZixLocationInfoWidgetWrapper: React.FC<ZixLocationInfoWidgetWrapperProps> = ({
  children,
  locationId,
  canEdit,
  onAddNewLocation,
}) => {
  const { editLocation } = useLocationManager();

  const { data, isLoading } = useQuery({
    queryFn: () => locationId ? LocationService.retrieve({
      location: locationId,
    }) : undefined,
    queryKey: ['LocationService.retrieve', locationId],
    enabled: !!locationId,
  })

  const [loadingEditAction, setLoadingEditAction] = useState(false)
  async function onEditLocation() {
    setLoadingEditAction(true)
    const loc = await editLocation(locationId)
    onAddNewLocation?.(loc)
    setLoadingEditAction(false)
  }
  const renderEditButton = () => canEdit ? (
    <ZixButton icon={Pencil} size='$2' loading={loadingEditAction} onPress={() =>
      onEditLocation()
    }>
      {t('common:edit')}
    </ZixButton>
  ) : null

  return (
    <ZixWidgetContainer label={t('app:common.location')} labelPrepend={renderEditButton()}>
      {
        (isLoading || !data?.data) ? (<View height='$4' backgroundColor='$color3' />) : children?.(data?.data)
      }
    </ZixWidgetContainer>
  );
}


export default ZixLocationInfoWidgetWrapper;
