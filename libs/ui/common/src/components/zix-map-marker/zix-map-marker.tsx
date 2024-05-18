
import { LocationTransformer } from '@zix/api';
import React from 'react';

import { MapMarkerProps, Marker } from 'react-native-maps';
import { ThemeName, View } from 'tamagui';

export type ZixMapMarkerProps = Partial<MapMarkerProps> & {
  location: LocationTransformer;
  theme?: ThemeName | null
}

export const ZixMapMarker: React.FC<ZixMapMarkerProps> = ({
  location,
  theme = 'accent',
  ...props
}) => {
  if (!location?.latitude || !location?.longitude) return null;
  return (
    <Marker
      {...props}
      key={`${location.latitude}-${location.longitude}`}
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      title={location.address}
    >
      <View
        theme={theme}
        justifyContent="center"
        alignItems="center"
        width="$4"
        height="$4"
        backgroundColor='$color3'
        padding="$3"
        borderRadius="$10"
      >
        <View
          width="$1.5"
          height="$1.5"
          backgroundColor='$color10'
          padding="$2"
          borderRadius="$10"
        />
      </View>
    </Marker>
  );
}


export default ZixMapMarker;
