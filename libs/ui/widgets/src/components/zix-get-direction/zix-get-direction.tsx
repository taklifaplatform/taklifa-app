import { LocationTransformer } from '@zix/api';
import { t } from 'i18next';
import React from 'react';

import { Popup, ShowLocationProps } from 'react-native-map-link';
import { Button, View } from 'tamagui';

export interface ZixGetDirectionProps {
  startLocation: LocationTransformer;
  endLocation: LocationTransformer;
  title?: string;
}

export const ZixGetDirection: React.FC<ZixGetDirectionProps> = ({
  startLocation,
  endLocation,
  title = 'Destination',
}) => {
  const [isVisible, setIsVisible] = React.useState(false);


  if (!startLocation?.latitude || !endLocation?.latitude || !endLocation?.longitude) {
    return null;
  }

  const options: ShowLocationProps = {
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
        setIsVisible={setIsVisible}
        onCancelPressed={() => setIsVisible(false)}
        onAppPressed={() => setIsVisible(false)}
        options={options}
        style={{
          modalView: {
            height: 400
          }
        }}
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
        marginTop="$4"
        fontWeight="bold"
        onPress={() => {
          setIsVisible(true);
        }}
        themeInverse
      >
        {t('common:get-direction')}
      </Button>
    </View>
  );
}

export default ZixGetDirection;
