import { LocationTransformer } from '@zix/api';
import { ZixMapMarker } from '@zix/ui/common';
import React, { useEffect, useRef } from 'react';

import MapView from 'react-native-maps';
import { View } from 'tamagui';

export type ZixMapPointerFieldProps = {
  onChange?: (val: LocationTransformer) => void;
  value: LocationTransformer;
};

export const ZixMapPointerField: React.FC<ZixMapPointerFieldProps> = (
  props,
) => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current && props.value?.latitude && props.value?.longitude) {
      try {
        mapRef.current?.animateCamera(
          {
            center: {
              latitude: Number(props.value.latitude),
              longitude: Number(props.value.longitude),
            },
            zoom: 10,
          },
          { duration: 1000 },
        );
      } catch (error) {
        //
      }
    }
  }, [props.value?.latitude, props.value?.longitude]);

  const mapPressTimeout = useRef<NodeJS.Timeout | null>(null);

  function onCoordinateUpdate(coordinate) {
    if (mapPressTimeout.current) {
      clearTimeout(mapPressTimeout.current);
    }
    mapPressTimeout.current = setTimeout(() => {
      if (coordinate) {
        props.onChange?.({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        });
      }
    }, 1000);
  }

  return (
    <View flex={1} borderRadius="$4" overflow="hidden">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider='google'
        initialCamera={{
          center: {
            latitude: props.value?.latitude || 24.713552,
            longitude: props.value?.longitude || 46.675296,
          },
          pitch: 0,
          heading: 0,
          altitude: 100000,
          zoom: 10,
        }}
        onPress={(e) => onCoordinateUpdate(e.nativeEvent.coordinate)}
        toolbarEnabled={false}
      >
        <ZixMapMarker
          location={props.value}
          draggable={!!props.onChange}
          onDragEnd={(e) => onCoordinateUpdate(e.nativeEvent.coordinate)}
        />
      </MapView>
    </View>
  );
};

export default ZixMapPointerField;
