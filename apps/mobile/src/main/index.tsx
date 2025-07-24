import { useAuth, USER_ROLES } from '@zix/services/auth';
import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';

import { Dimensions, Image, View } from 'react-native';
import { useRouter } from 'solito/router';

export default function Screen() {
  const { width, height } = Dimensions.get('window');
  const {user, getUrlPrefix} = useAuth();
  console.log("user", JSON.stringify(user, null, 2))

  function redirectUser() {
    console.log("getUrlPrefix", getUrlPrefix)
    setTimeout(() => {
      if(user?.roles?.includes({name: USER_ROLES.company_owner})){
        router.replace(`${getUrlPrefix}/store`);
      }else if(user?.roles?.includes({name: USER_ROLES.service_provider})){
        router.replace(`${getUrlPrefix}/services`);
      }else{
        router.replace(`${getUrlPrefix}`);
      }
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
