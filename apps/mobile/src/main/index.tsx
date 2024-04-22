import React from 'react';

import { Dimensions, Image, Platform, View } from 'react-native';
import { useRouter } from 'solito/router';

export default function Screen() {
  const { width, height } = Dimensions.get('window');

  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#333333',
      }}
      onLayout={() => {
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            router.replace('/app');
          }, 4000);
        } else {
          router.replace('/app');
        }
      }}
    >
      <Image
        source={require('../../assets/splash.gif')}
        resizeMode="cover"
        resizeMethod="resize"
        style={{ width, height }}
      />
    </View>
  );
}
