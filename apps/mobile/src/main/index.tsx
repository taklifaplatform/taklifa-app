import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';

import { Dimensions, Image, View } from 'react-native';
import { useRouter } from 'solito/router';

export default function Screen() {
  const { width, height } = Dimensions.get('window');


  function redirectUser() {
    setTimeout(() => {
      router.replace('/auth/create-company');
      // router.replace('/auth/login');
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F5837',
      }}
    >
      <Image
        source={require('../../assets/splash.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{ width: width * 0.8, height: height * 0.8 }}
      />
    </View>
  );
}
