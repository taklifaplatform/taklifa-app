import { ZixMap } from '@zix/app/ui/common';
import { IMarker, MapVehicleMarker } from '@zix/app/ui/sawaeed';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import type { Region } from 'react-native-maps';

/* eslint-disable-next-line */
export interface HomeScreenProps { }

const vehicleTypes = ['vehicle_a', 'vehicle_b', 'vehicle_c'];

const initialCamera = {
  center: {
    latitude: 24.713552,
    longitude: 46.675296
  },
  pitch: 0,
  heading: 0,
  altitude: 100000,
  zoom: 20
};

export function HomeScreen(props: HomeScreenProps) {
  // create random 10 dynamically moving markers on the map
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [currentRegion, setCurrentRegion] = useState<Region>();

  const moveMarkers = useCallback(() => {
    setMarkers((prev) =>
      prev.map((marker) => ({
        ...marker,
        rotateDegree: `${Math.random() * 20}deg`,
        coordinate: {
          latitude: marker.coordinate.latitude + (Math.random() - 0.5) * 0.005,
          longitude: marker.coordinate.longitude + (Math.random() - 0.5) * 0.005
        }
      }))
    );
  }, []);

  const setInitialMarkers = useCallback(() => {
    const newMarkers: IMarker[] = [];

    Array.from({ length: 15 }).forEach(() => {
      newMarkers.push({
        vehicle_type: vehicleTypes[Math.floor(Math.random() * 3)],
        coordinate: {
          latitude:
            initialCamera.center?.latitude + (Math.random() - 0.5) * 0.2,
          longitude:
            initialCamera.center?.longitude + (Math.random() - 0.5) * 0.2
        }
      });
    });
    Array.from({ length: 40 }).forEach(() => {
      newMarkers.push({
        vehicle_type: vehicleTypes[Math.floor(Math.random() * 3)],
        coordinate: {
          latitude:
            initialCamera.center?.latitude + (Math.random() - 0.5) * 5,
          longitude:
            initialCamera.center?.longitude + (Math.random() - 0.5) * 5
        }
      });
    });
    setMarkers(newMarkers);
  }, []);

  const $interval = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (Platform.OS === 'ios') {
      $interval.current = setInterval(() => {
        moveMarkers();
      }, 1000);
    }
    setInitialMarkers();
    return () => $interval.current && clearInterval($interval.current);
  }, [moveMarkers]);

  return (
    <ZixMap.MapView
      style={{ flex: 1 }}
      initialCamera={initialCamera}
      onRegionChange={setCurrentRegion}
    >
      {markers.map((marker, index) => (
        <MapVehicleMarker key={`key-${index}`} index={index} marker={marker} />
      ))}
    </ZixMap.MapView>
  );
}

export default HomeScreen;
