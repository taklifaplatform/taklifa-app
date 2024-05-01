import { LocationTransformer } from '@zix/api';
import { t } from 'i18next';
import React, { useRef } from 'react';
import { set } from 'react-hook-form';

import { Text, Pressable, StyleSheet } from 'react-native';
import { Popup, showLocation } from 'react-native-map-link';
import { View, Button } from 'tamagui';

/* eslint-disable-next-line */
export interface ZixGetDirectionProps {
  startLocation: LocationTransformer;
  endLocation: LocationTransformer;
  title?: string;
}

export function ZixGetDirection({
  startLocation,
  endLocation,
  title = 'Destination',
}: ZixGetDirectionProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const options = {
    sourceLatitude: startLocation.latitude,
    sourceLongitude: startLocation.longitude,
    latitude: endLocation.latitude,
    longitude: endLocation.longitude,
    title,
    googleForceLatLon: true, // optionally force GoogleMaps to use the latlon for the query instead of the title
    alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)

  };
  return (
    <View>
      <Popup
        isVisible={isVisible}
        onCancelPressed={() => setIsVisible(false)}
        onAppPressed={() => setIsVisible(false)}
        onBackButtonPressed={() => setIsVisible(false)}
        options={options}
        customFooter={
          <Button
            fontWeight="bold"
            onPress={() => setIsVisible(false)}
            themeInverse
          >
            Cancel
          </Button>
        }
      />

      <Button
        mt="$4"
        fontWeight="bold"
        onPress={() => {
          setIsVisible(true);
        }}
        themeInverse
      >
        Get Direction
      </Button>
    </View>
  );
}

export default ZixGetDirection;
