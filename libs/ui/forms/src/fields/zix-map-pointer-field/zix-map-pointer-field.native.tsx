
import React from 'react';

import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

export type Location = {
  latitude: number
  longitude: number
}

export type ZixMapPointerFieldProps = {
  onChange: (val: Location) => void,
  value: Location,
}


export const ZixMapPointerField: React.FC<ZixMapPointerFieldProps> = (props) => {
  return (
    <MapView style={{ flex: 1 }}>

    </MapView>
  );
}


export default ZixMapPointerField;
