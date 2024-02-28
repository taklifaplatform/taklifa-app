import React from 'react';
import { Image, View } from 'tamagui';

import { useAuth } from '@zix/utils';
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Screen() {
  const { redirectUserToActiveDashboard } = useAuth()

  return (
    <View
      backgroundColor="$color5"
      flex={1}
      onLayout={() => {
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            redirectUserToActiveDashboard();
          }, 3000);
        } else {
          redirectUserToActiveDashboard();
        }
      }}
    >
      <Image
        source={require('../../assets/splash.gif')}
        resizeMode="stretch"
        width={width}
        height={height}
      />
    </View>
  );
}
