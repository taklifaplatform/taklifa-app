
import React from 'react';

import { Text, YStack } from 'tamagui';
import ZixLocationInfoWidgetWrapper, { ZixLocationInfoWidgetWrapperProps } from './zix-location-info-widget-wrapper';

export const ZixLocationInfoWidget: React.FC<ZixLocationInfoWidgetWrapperProps> = (props) => {
  const {
    location
  } = props;

  return (
    <ZixLocationInfoWidgetWrapper {...props}>
      <YStack gap='$4'>
        <Text>
          {location?.address}
        </Text>
      </YStack>
    </ZixLocationInfoWidgetWrapper>
  );
}


export default ZixLocationInfoWidget;
