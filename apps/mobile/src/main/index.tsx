import React from 'react';

import { Dimensions, Image, View } from 'react-native';
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
        setTimeout(() => {
          router.replace('/app');
        }, 4000);
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
