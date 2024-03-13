import { LocationTransformer } from '@zix/api';
import React from 'react';
import { Dimensions } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Stack, View } from 'tamagui';

/* eslint-disable-next-line */
export type ZixMapDirectionWidgetProps = {
  startLocation: LocationTransformer;
  endLocation: LocationTransformer;
};
const { width, height } = Dimensions.get('window');
//const height = 400;
const ASPECT_RATIO = width / height;

export const ZixMapDirectionWidget: React.FC<ZixMapDirectionWidgetProps> = ({
  startLocation,
  endLocation,
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
    latitude: start.latitude,
    longitude: start.longitude,
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
    ...Array.from({ length: 50 }, (_, i) => ({
      latitude: start.latitude + (end.latitude - start.latitude) * (i / 50),
      longitude: start.longitude + (end.longitude - start.longitude) * (i / 50),
    })),
    end,
  ];

  return (
    <Stack
      marginVertical="$1.5"
      marginHorizontal="$4"
      height={200}
      backgroundColor="$gray6"
      borderRadius="$5"
    >
      <MapView
      
        style={{
          flex: 1,
          borderRadius: 10,
        }}
        initialRegion={mapRegion as any}
        
      >
        <Marker
          coordinate={start as any}
          title={startLocation.address}
          description={startLocation.address}
        ><View justifyContent='center' alignItems='center' width={1} height={1} backgroundColor={'$gray6'} padding="$3" borderRadius="50%">
        <View width={1} height={1} backgroundColor={'$gray9'} padding='$2' borderRadius="50%" />
      </View>
      </Marker>

        <Polyline coordinates={polyline} strokeColor="red" strokeWidth={6} />
        <Marker coordinate={end as any} title={endLocation.address}>
          <View justifyContent='center' alignItems='center' width={1} height={1} backgroundColor={'$color3'} padding="$3" borderRadius="50%">
            <View width={1} height={1} backgroundColor={'$color5'} padding='$2' borderRadius="50%" />
          </View>
        </Marker>
      </MapView>
    </Stack>
  );
};

export default ZixMapDirectionWidget;
