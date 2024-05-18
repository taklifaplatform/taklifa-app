
import { LocationService, LocationTransformer } from '@zix/api';
import React, { useState } from 'react';

import { Pencil } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@zix/services/auth';
import { ZixButton } from '@zix/ui/common';
import { t } from 'i18next';
import { useRouter } from 'solito/router';
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
  const router = useRouter()
  const { getUrlPrefix } = useAuth()


  const { data, isLoading } = useQuery({
    queryFn: () => locationId ? LocationService.retrieve({
      location: locationId,
    }) : undefined,
    queryKey: ['LocationService.retrieve', locationId],
  })

  const [loadingEditAction, setLoadingEditAction] = useState(false)
  const renderEditButton = () => canEdit ? (
    <ZixButton icon={Pencil} size='$2' loading={loadingEditAction} onPress={() => {
      if (!locationId) {
        setLoadingEditAction(true)
        LocationService.create({
          requestBody: {},
        }).then(async ({ data }) => {
          if (!data) return
          await onAddNewLocation?.(data)
          setLoadingEditAction(false)
          router.push(`${getUrlPrefix}/locations/${data?.id}/edit`)
        })
      } else {
        router.push(`${getUrlPrefix}/locations/${locationId}/edit`)
      }

    }}>
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
