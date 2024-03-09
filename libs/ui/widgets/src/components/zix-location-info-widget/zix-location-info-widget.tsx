
import { LocationTransformer } from '@zix/api';
import React from 'react';

import { Text, YStack } from 'tamagui';

export type ZixLocationInfoWidgetProps = {
  location: LocationTransformer
}

export const ZixLocationInfoWidget: React.FC<ZixLocationInfoWidgetProps> = ({
  location
}) => {
  return (
    <YStack gap='$4'>
      <Text>
        {location?.address}
      </Text>
    </YStack>
  );
}


export default ZixLocationInfoWidget;
