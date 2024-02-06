import { ZixMap } from '@zix/app/ui/common';
import { CustomIcon } from '@zix/app/ui/icons';
import type { LatLng } from 'react-native-maps';
import { View } from 'tamagui';

export type IMarker = {
  vehicle_type: string;
  rotateDegree?: string;
  coordinate: LatLng;
};

export type MapVehicleMarkerProps = {
  index: number;

  marker: IMarker;
};

export function MapVehicleMarker({ marker, index }: MapVehicleMarkerProps) {
  return (
    <ZixMap.Marker key={index} coordinate={marker.coordinate}>
      <View
        // rotate vehicle icon based on its direction
        style={{
          transform: [
            {
              rotate: marker.rotateDegree || '0deg'
            }
          ]
        }}
      >
        <CustomIcon name={marker.vehicle_type} size="$4" />
      </View>
    </ZixMap.Marker>
  );
}

export default MapVehicleMarker;
