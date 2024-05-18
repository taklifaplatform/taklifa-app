
import { LocationService, LocationTransformer } from '@zix/api';
import React from 'react';

import { Pencil } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@zix/services/auth';
import { t } from 'i18next';
import { useRouter } from 'solito/router';
import { Button, View } from 'tamagui';
import ZixWidgetContainer from '../zix-widget-container/zix-widget-container';

export type ZixLocationInfoWidgetWrapperProps = {
  locationId: string;
  canEdit?: boolean;
  children?: (location: LocationTransformer) => React.ReactNode;
}

export const ZixLocationInfoWidgetWrapper: React.FC<ZixLocationInfoWidgetWrapperProps> = ({
  children,
  locationId,
  canEdit
}) => {
  const router = useRouter()
  const { getUrlPrefix } = useAuth()

  const { data, isLoading } = useQuery({
    queryFn: () => LocationService.retrieve({
      location: locationId,
    }),
    queryKey: ['LocationService.retrieve', locationId],
  })

  const renderEditButton = () => canEdit ? (
    <Button icon={Pencil} size='$2' onPress={() => {
      router.push(`${getUrlPrefix}/locations/${locationId}/edit`)
    }}>
      {t('common:edit')}
    </Button>
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
