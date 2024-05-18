import React from 'react';

import { View } from 'react-native';
import { useRouter } from 'solito/router';

export default function Screen() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FECA16',
      }}
      onLayout={() => {
        router.replace('/app');
      }}
    />
  );
}
