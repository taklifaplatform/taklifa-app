
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
          latitude: parseFloat(location?.latitude ?? '0'),
          longitude: parseFloat(location?.longitude ?? '0'),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(location?.latitude ?? '0'),
            longitude: parseFloat(location?.longitude ?? '0')
          }}
          title={location?.address}
          description={location?.address}
        />
      </MapView>
    </YStack>
  );
}


export default ZixLocationInfoWidget;
