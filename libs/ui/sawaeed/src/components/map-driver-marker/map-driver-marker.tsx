import { DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
// import { ZixMap } from '@zix/ui/common';
import { Marker } from 'react-native-maps';

import { Image, View } from 'tamagui';


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

  const renderCarIcon = () => driver?.vehicle?.model?.map_icon?.url ? (
    <Image
      source={{ uri: driver.vehicle.model.map_icon.url }}
      width={driver.vehicle.model.map_icon_width || '$4'}
      height={driver.vehicle.model.map_icon_height || '$4'}
    />
  ) : (
    <CustomIcon name='vehicle_a' size="$4" />
  )

  if (!driver.location) {
    return null;
  }

  return (
    <Marker
      key={driver.id}
      coordinate={{
        latitude: parseFloat(driver.location.latitude ?? '0'),
        longitude: parseFloat(driver.location.longitude ?? '0'),
      }}
      onPress={() => onPress?.()}
    >
      <View
        width='$8'
        height='$8'
        alignItems='center'
        justifyContent='center'
        borderColor='$color5'
        // rotate vehicle icon based on its direction
        style={
          isSelected
            ? {
              borderWidth: 1,
              borderColor: 'rgba(254, 202, 22, 0.1)',
              backgroundColor: 'rgba(254, 202, 22, 0.3)',
              borderRadius: 50,
            }
            : null
        }
      >
        {renderCarIcon()}
      </View>
    </Marker>
  );
}

export default MapDriverMarker;
