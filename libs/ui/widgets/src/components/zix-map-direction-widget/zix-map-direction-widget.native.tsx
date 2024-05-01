import { LocationTransformer } from '@zix/api';
import React from 'react';
import { Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Button, Stack, View } from 'tamagui';
import ZixGetDirection from '../zix-get-direction/zix-get-direction';

/* eslint-disable-next-line */
export type ZixMapDirectionWidgetProps = {
  startLocation: LocationTransformer;
  endLocation: LocationTransformer;
  status: string;
};
const { width, height } = Dimensions.get('window');
//const height = 400;
const ASPECT_RATIO = width / height;

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

  // generate fake polyline direction fro start to end with 50 pionts
  const polyline = [
    start,
    {
      ...start,
      latitude: start.latitude + 0.08,
      longitude: start.longitude + 0.01,
    },
    // ...Array.from({ length: 50 }, (_, i) => ({
    //   latitude: start.latitude + (end.latitude - start.latitude) * (i / 50),
    //   longitude: start.longitude + (end.longitude - start.longitude) * (i / 50),
    // })),
    end,
  ];

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

  return (
    <Stack height={200} backgroundColor="$gray6" borderRadius="$5">
      <MapView
        style={{
          flex: 1,
          borderRadius: 10,
        }}
        initialRegion={mapRegion}
      >
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

        <Marker coordinate={end as any} title={endLocation.address}>
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
      </MapView>
      <ZixGetDirection startLocation={startLocation} endLocation={endLocation}  />
    </Stack>
  );
};

export default ZixMapDirectionWidget;
