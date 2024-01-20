import { ZixMap } from '@zix/app/ui/common';
import { IMarker, MapVehicleMarker } from '@zix/app/ui/sawaeed';
import { useEffect, useState } from 'react';
import type { Region } from 'react-native-maps';
// import MapView from 'react-native-maps';

/* eslint-disable-next-line */
export interface HomeScreenProps {}

const vehicleTypes = ['vehicle_a', 'vehicle_b', 'vehicle_c'];

export function HomeScreen(props: HomeScreenProps) {
  // create random 10 dynamically moving markers on the map
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [currentRegion, setCurrentRegion] = useState<Region>();
  useEffect(() => {
    const interval = setInterval(() => {
      // move markers
      setMarkers((prev) =>
        prev.map((marker) => ({
          ...marker,
          rotateDegree: `${Math.random() * 20}deg`,
          coordinate: {
            latitude: marker.coordinate.latitude + (Math.random() - 0.5) * 0.02,
            longitude:
              marker.coordinate.longitude + (Math.random() - 0.5) * 0.02
          }
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function onSetCurrentRegion(region: Region) {
    if (!currentRegion) {
      setMarkers(
        Array.from({ length: 10 }).map(() => ({
          vehicle_type: vehicleTypes[Math.floor(Math.random() * 3)],
          coordinate: {
            latitude: region?.latitude + (Math.random() - 0.5) * 2,
            longitude: region?.longitude + (Math.random() - 0.5) * 2
          }
        }))
      );
    }

    setCurrentRegion(region);
  }

  return (
    <ZixMap.MapView style={{ flex: 1 }} onRegionChange={onSetCurrentRegion}>
      {markers.map((marker, index) => (
        <MapVehicleMarker key={`key-${index}`} index={index} marker={marker} />
      ))}
    </ZixMap.MapView>
  );
}

export default HomeScreen;
