import { LocationTransformer } from '@zix/api';
import { useThemeSetting } from '@zix/providers';
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

  const { current } = useThemeSetting();
  const darkMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#9e9e9e" }]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#bdbdbd" }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{ "color": "#181818" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#616161" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#1b1b1b" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#2c2c2c" }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#8a8a8a" }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{ "color": "#373737" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{ "color": "#3c3c3c" }]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [{ "color": "#4e4e4e" }]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#616161" }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#000000" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#3d3d3d" }]
    }
  ];

  return (
    <View flex={1} borderRadius="$4" overflow="hidden">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        customMapStyle={current === 'dark' ? darkMapStyle : []}
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
