
import React, { useRef } from 'react';

import { Text, View, YStack } from 'tamagui';
import ZixLocationInfoWidgetWrapper, { ZixLocationInfoWidgetWrapperProps } from './zix-location-info-widget-wrapper';
import MapView, { Marker } from 'react-native-maps';
import { Platform } from 'react-native';

export const ZixLocationInfoWidget: React.FC<ZixLocationInfoWidgetWrapperProps> = (props) => {

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBw3sZh4uFyLbi9sKTzKYn3BqIS_b-vGeA';
  const mapRef = useRef<MapView>(null);

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
