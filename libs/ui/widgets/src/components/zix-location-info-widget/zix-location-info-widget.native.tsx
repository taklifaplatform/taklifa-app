
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

import { Text, YStack } from 'tamagui';
import ZixLocationInfoWidgetWrapper, { ZixLocationInfoWidgetWrapperProps } from './zix-location-info-widget-wrapper';
import { LocationTransformer } from '@zix/api';

export const ZixLocationInfoWidget: React.FC<ZixLocationInfoWidgetWrapperProps> = (props) => {

  const renderMap = (location: LocationTransformer) => (!!location?.latitude && !!location?.longitude) && (
    <MapView
      style={{ flex: 1, height: 200, borderRadius: 14 }}
      initialRegion={{
        latitude: location?.latitude,
        longitude: location?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: location?.latitude,
          longitude: location?.longitude
        }}
        title={location?.address}
        description={location?.address}
      />
    </MapView>
  )

  return (
    <ZixLocationInfoWidgetWrapper {...props}>
      {
        (location) => (
          <YStack gap='$4'>
            <Text>
              {location?.address ?? 'No address'}
            </Text>
            {renderMap(location)}
          </YStack>
        )
      }
    </ZixLocationInfoWidgetWrapper>
  );
}


export default ZixLocationInfoWidget;
