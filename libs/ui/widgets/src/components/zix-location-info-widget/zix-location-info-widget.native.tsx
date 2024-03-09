
import { LocationTransformer } from '@zix/api';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

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
    </YStack>
  );
}


export default ZixLocationInfoWidget;
