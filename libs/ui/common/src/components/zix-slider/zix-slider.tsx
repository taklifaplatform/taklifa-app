import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { XStack } from 'tamagui';

export type ZixSliderProps = {
  min: number;
  max: number;
  step: number;
  values: [number, number];
  onValuesChange: (values: [number, number]) => void;
};

export const ZixSlider: React.FC<ZixSliderProps> = ({
  min,
  max,
  values,
  step,
  onValuesChange,
}) => {
  return (
    <XStack width="100%">
      <MultiSlider
        values={values}
        min={min}
        max={max}
        step={step}
        sliderLength={Dimensions.get('window').width - 40}
        onValuesChange={(vals) => {
          onValuesChange([vals[0], vals[1]]);
        }}
        selectedStyle={{ backgroundColor: '#000000' }}
        unselectedStyle={{ backgroundColor: '#d3d3d3' }}
        markerStyle={{
          backgroundColor: '#D9FFEC',
          borderRadius: 100,
          width: 20,
          height: 20,
          borderWidth: 1,
          borderColor: '#000000',
        }}
        containerStyle={{ width: '100%', transform: [{ scaleX: -1 }] }}
        allowOverlap={false}
      />
    </XStack>
  );
};

export default ZixSlider;
