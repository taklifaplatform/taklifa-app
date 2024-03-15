import { LocationTransformer } from '@zix/api';
import React from 'react';
import { Dimensions } from 'react-native';
import { Stack } from 'tamagui';

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
      
    </Stack>
  );
};

export default ZixMapDirectionWidget;
