import { DriverTransformer } from '@zix/api';
import { ZixMediasListWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';

import { YStack } from 'tamagui';

export type UserVehicleTabProps = {
  user: DriverTransformer
}

export const UserVehicleTab: React.FC<UserVehicleTabProps> = ({
  user
}) => {
  const renderVehicleImages = () => !!user.vehicle?.images?.length && (
    <ZixWidgetContainer label={`${t('common:vehicle-images')}`}>
      <ZixMediasListWidget
        medias={user.vehicle.images}
        imageHeight={70}
        imageWidth={120}
      />
    </ZixWidgetContainer>
  )

  return (
    <YStack>
      {renderVehicleImages()}
    </YStack>
  );
}

export default UserVehicleTab;
