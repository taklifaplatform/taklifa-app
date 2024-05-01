
import { LocationTransformer } from '@zix/api';
import React from 'react';

import { t } from 'i18next';
import ZixWidgetContainer from '../zix-widget-container/zix-widget-container';
import { useRouter } from 'solito/router';
import { useAuth } from '@zix/services/auth';
import { Pencil } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';

export type ZixLocationInfoWidgetWrapperProps = {
  location: LocationTransformer,
  canEdit?: boolean;
  children?: React.ReactNode;
}

export const ZixLocationInfoWidgetWrapper: React.FC<ZixLocationInfoWidgetWrapperProps> = ({
  children,
  location,
  canEdit
}) => {
  const router = useRouter()
  const { getUrlPrefix } = useAuth()

  const renderEditButton = () => canEdit ? (
    <Button icon={Pencil} size='$2' onPress={() => {
      router.push(`${getUrlPrefix}/locations/${location.id}/edit`)
    }}>
      {t('common:edit')}
    </Button>
  ) : null

  return (
    <ZixWidgetContainer label={t('app:common.location')} labelPrepend={renderEditButton()}>
      {children}
    </ZixWidgetContainer>
  );
}


export default ZixLocationInfoWidgetWrapper;
