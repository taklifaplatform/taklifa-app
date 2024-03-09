import { DriverTransformer } from '@zix/api';
// import { ZixMap } from '@zix/ui/common';
import { Marker } from 'react-native-maps';

import { CustomIcon } from '@zix/ui/icons';
import { View } from 'tamagui';


export type MapDriverMarkerProps = {
  driver: DriverTransformer;
  isSelected?: boolean;
  onPress?: () => void;
};

export const MapDriverMarker: React.FC<MapDriverMarkerProps> = ({
  driver,
  isSelected,
  onPress
}: MapDriverMarkerProps) => {

  if (!driver.location) {
    return null;
  }

  return (
    <Marker
      key={driver.id}
      coordinate={{
        latitude: driver.location.latitude,
        longitude: driver.location.longitude
      }}
      onPress={() => onPress?.()}
    >
      <View
        // rotate vehicle icon based on its direction
        style={
          isSelected
            ? {
              borderWidth: 10,
              borderColor: 'rgba(254, 202, 22, 0.1)',
              backgroundColor: 'rgba(254, 202, 22, 0.3)',
              borderRadius: 50,
              padding: 7,
            }
            : null
        }
      >
        <CustomIcon name='vehicle_a' size="$4" />
      </View>
    </Marker>
  );
}

export default MapDriverMarker;
