import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';

import { Dimensions, Image, View } from 'react-native';
import { useRouter } from 'solito/router';

export default function Screen() {
  const { width, height } = Dimensions.get('window');


  function redirectUser() {
    setTimeout(() => {
      // router.replace('/auth/verify-kyc');
      router.replace('/app');
    }, 1000);
  }
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      redirectUser()
    }, [])
  )

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#333333',
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
