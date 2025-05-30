import { X } from '@tamagui/lucide-icons';
import { LocationTransformer } from '@zix/api';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, Stack, View } from 'tamagui';
import ZixGetDirection from '../zix-get-direction/zix-get-direction';

/* eslint-disable-next-line */
export type ZixMapDirectionWidgetProps = {
  startLocation: LocationTransformer;
  endLocation: LocationTransformer;
  status: string;
};
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// const GOOGLE_MAPS_APIKEY = 'AIzaSyBw3sZh4uFyLbi9sKTzKYn3BqIS_b-vGeA'; // Replace with your actual API key

export const ZixMapDirectionWidget: React.FC<ZixMapDirectionWidgetProps> = ({
  startLocation,
  endLocation,
  status,
}) => {
  const start = {
    latitude: Number(startLocation.latitude) || 0,
    longitude: Number(startLocation.longitude) || 0,
  };
  const end = {
    latitude: Number(endLocation.latitude) || 0,
    longitude: Number(endLocation.longitude) || 0,
  };
  const mapRegion = {
    latitude: (start.latitude + end.latitude) / 2,
    longitude: (start.longitude + end.longitude) / 2,
    latitudeDelta: Math.abs(start.latitude - end.latitude) * 2,
    longitudeDelta: Math.abs(start.longitude - end.longitude) * ASPECT_RATIO,
  };

  const [currentLocation, setCurrentLocation] = useState(start);

  // Track real-time user location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every second
          distanceInterval: 1, // Update every meter
        },
        (location) => {
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );
    })();
  }, []);

  function getStatusColor(status: string) {
    switch (status) {
      case 'cancelled':
        return 'error';
      case 'delivered':
        return 'success';
      default:
        return 'accent';
    }
  }

  const [viewMap, setViewMap] = useState(false)
  return (
    <Stack height={viewMap ? 600 : 200} backgroundColor="$gray6" borderRadius="$5">
      {viewMap && <Button
        onPress={() => setViewMap(false)}
        unstyled
        position='absolute'
        zIndex={1}
        theme={'accent'}
        size={'$2'}
      >
        <X size={'$3'} color={'white'} />
      </Button>}
      <MapView
        onPress={() => setViewMap(!viewMap)}
        style={{
          flex: 1,
          borderRadius: 10,
        }}
        initialRegion={mapRegion}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: mapRegion.latitudeDelta,
          longitudeDelta: mapRegion.longitudeDelta,
        }}
      >


        {/* Start and End Markers */}
        <Marker
          coordinate={start}
          title={startLocation.address}
          description={startLocation.address}
        >
          <View
            theme={getStatusColor(status)}
            justifyContent="center"
            alignItems="center"
            width={1}
            height={1}
            backgroundColor={'$color3'}
            padding="$3"
            borderRadius="$10"
          >
            <View
              width={1}
              height={1}
              backgroundColor={'$color9'}
              padding="$2"
              borderRadius="$10"
            />
          </View>
        </Marker>

        <Marker coordinate={end} title={endLocation.address}>
          <View
            justifyContent="center"
            alignItems="center"
            width={1}
            height={1}
            backgroundColor={'$color3'}
            padding="$3"
            borderRadius="$10"
          >
            <View
              width={1}
              height={1}
              backgroundColor={'$color5'}
              padding="$2"
              borderRadius="$10"
            />
          </View>
        </Marker>

        {/* Direction Path */}
        {/* <MapViewDirections
          origin={start}
          destination={end}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={6}
          strokeColor="#ffd32c"
          onError={(errorMessage) => console.log('Error: ', errorMessage)}
        /> */}
      </MapView>
      <ZixGetDirection startLocation={startLocation} endLocation={endLocation} />
    </Stack>
  );
};

export default ZixMapDirectionWidget;
