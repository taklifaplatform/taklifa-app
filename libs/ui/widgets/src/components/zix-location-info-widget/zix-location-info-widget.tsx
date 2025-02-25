
import React, { useRef } from 'react';

import { Text, View, YStack } from 'tamagui';
import ZixLocationInfoWidgetWrapper, { ZixLocationInfoWidgetWrapperProps } from './zix-location-info-widget-wrapper';
import MapView, { Marker } from 'react-native-maps';
import { Platform } from 'react-native';
import { useThemeSetting } from '@zix/providers';

export const ZixLocationInfoWidget: React.FC<ZixLocationInfoWidgetWrapperProps> = (props) => {

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBw3sZh4uFyLbi9sKTzKYn3BqIS_b-vGeA';
  const mapRef = useRef<MapView>(null);
    // DARK Map Style
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
    <ZixLocationInfoWidgetWrapper {...props}>
      {
        (location) => (
          <YStack gap='$4'
            padding='$4'
            height={350}
          >
            <Text>
              {location?.address}
            </Text>
            {location?.latitude && Platform.OS === 'web' &&
              <YStack
                flex={1}
              >
                <MapView
                  provider="google"
                  ref={mapRef}
                  customMapStyle={current === 'dark' ? darkMapStyle : []}
                  style={{ flex: 1 }}
                  toolbarEnabled={false}
                  showsUserLocation
                  zoomControlEnabled={false}
                  showsCompass={false}
                  showsMyLocationButton={false}
                  showsTraffic={false}
                  key={GOOGLE_MAPS_APIKEY}
                  initialRegion={{
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                    latitudeDelta: 1.0922,
                    longitudeDelta: 1.0421,
                  }}

                >
                  <Marker
                    coordinate={{
                      latitude: parseFloat(location?.latitude ?? '0'),
                      longitude: parseFloat(location?.longitude ?? '0'),
                    }}
                  >
                    <View
                      width='$8'
                      height='$8'
                      alignItems='center'
                      justifyContent='center'
                      borderColor='$color5'
                      cursor='pointer'
                      style={
                        {
                          borderWidth: 30,
                          borderColor: 'rgba(254, 202, 22, 0.1)',
                          backgroundColor: 'rgba(246, 194, 3, 0.41)',
                          borderRadius: 50,
                        }

                      }
                    >
                      <View
                      width={35}
                      height={35}
                      backgroundColor='#FECA16'
                      borderRadius={50}
                      />
                    </View>
                  </Marker>
                </MapView>
              </YStack>}
          </YStack>
        )
      }
    </ZixLocationInfoWidgetWrapper>
  );
}


export default ZixLocationInfoWidget;
