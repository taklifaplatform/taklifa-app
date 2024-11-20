import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';

import { View } from 'react-native';
import { useRouter } from 'solito/router';

export default function Screen() {
  const router = useRouter();
  function redirectUser() {
    setTimeout(() => {
      router.replace('/app');
    }, 1000);
  }
  useFocusEffect(
    useCallback(() => {
      redirectUser()
    }, [])
  )

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FECA16',
      }}
    />
  );
}
