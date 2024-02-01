import { Image, View } from '@zix/app/ui/core';
import { router } from 'expo-router';
import React from 'react';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export default function Screen() {
  return (
    <View
      backgroundColor="$color5"
      flex={1}
      onLayout={() => {
        setTimeout(() => {
          router.replace('/customer');
        }, 3000);
      }}
    >
      <Image
        source={require('../../assets/splash.gif')}
        resizeMode="contain"
        width={width}
        height={height}
      />
    </View>
  );
}
