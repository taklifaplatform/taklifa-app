
import { LocationTransformer } from '@zix/api';
import React from 'react';

import MapView, { Marker } from 'react-native-maps';
import { View } from 'tamagui';

export type ZixMapPointerFieldProps = {
  onChange: (val: LocationTransformer) => void,
  value: LocationTransformer,
}


export const ZixMapPointerField: React.FC<ZixMapPointerFieldProps> = (props) => {
  return (
    <View flex={1} borderRadius='$4' overflow='hidden'>
      <MapView style={{ flex: 1 }} initialCamera={{
        center: props.value,
        pitch: 0,
        heading: 0,
        altitude: 100000,
        zoom: 20,
      }}>
        <Marker
          coordinate={props.value}
          title="Hello"
          description="I'm here"
        >
          <View
            theme='accent'
            backgroundColor='rgba(254, 202, 22, 0.3)'
            width='$4'
            height='$4'
            borderRadius='$20'
            alignItems='center'
            justifyContent='center'
          >
            <View
              theme='accent'
              backgroundColor='$color9'
              width='$1.5'
              height='$1.5'
              borderRadius='$20'
            />
          </View>
        </Marker>
      </MapView>
    </View>

  );
}


export default ZixMapPointerField;
