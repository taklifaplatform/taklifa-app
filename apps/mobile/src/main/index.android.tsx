import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';

import { View } from 'react-native';
import { useRouter } from 'solito/router';

export default function Screen() {
  const router = useRouter();
  function redirectUser() {
    router.replace('/app');
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
