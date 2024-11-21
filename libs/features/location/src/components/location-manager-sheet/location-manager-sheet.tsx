
import { useLocationManager } from '@zix/services/location';

import { View } from 'tamagui';
import LocationManager from '../location-manager/location-manager';


export function LocationManagerSheet() {
  const { location, locationEditorVisible, onCloseLocationEditor } = useLocationManager();

  if (!locationEditorVisible || !location?.id) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      }}
      backgroundColor='$background'
    >
      <LocationManager
        location={location}
        onComplete={onCloseLocationEditor}
      />
    </View>
  );
}


export default LocationManagerSheet;
