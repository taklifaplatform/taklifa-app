import React from 'react';

import { useAuth } from '@zix/utils';
import { Dimensions, Image, Platform, View } from 'react-native';
import { useRouter } from 'solito/router';


export default function Screen() {
  const { redirectUserToActiveDashboard } = useAuth()
  const { width, height } = Dimensions.get('window');
  const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#333333',
      }}
      onLayout={() => {
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            redirectUserToActiveDashboard();
          }, 4000);
        } else {
          redirectUserToActiveDashboard();
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
