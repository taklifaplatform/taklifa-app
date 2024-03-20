import { DriverTransformer } from '@zix/api';
// import { ZixMap } from '@zix/ui/common';
import { Marker } from 'react-native-maps';

import { CustomIcon } from '@zix/ui/icons';
import { View } from 'tamagui';
import { UserCard } from '@zix/features/users';


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
      {
        isSelected && (
          <View position='absolute' paddingLeft='$12' zIndex={10}>
            <UserCard
              key={`stack-${driver.id}`}
              user={driver}
              marginHorizontal='$4'
              marginVertical='$2'
              minWidth={400}
            />
          </View>
        )
      }
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
        <CustomIcon name='vehicle_a' size="$4" />
      </View>
    </Marker>
  );
}

export default MapDriverMarker;
