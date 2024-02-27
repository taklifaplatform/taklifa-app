import { Image, View } from 'tamagui';
import { router } from 'expo-router';
import React from 'react';

import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
export default function Screen() {
  return (
    <View
      backgroundColor="$color5"
      flex={1}
      onLayout={() => {
        // router.replace('/auth/verify-kyc');
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            router.replace('/customer');
          }, 3000);
        } else {
          router.replace('/customer');
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
