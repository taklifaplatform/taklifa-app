
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { View } from 'tamagui';

import { OpenAPI } from '@zix/api';
import { authAccessTokenStorage } from '@zix/core/auth';

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}) => {
  const [authAccessToken] = useAtom(authAccessTokenStorage);

  // const router = useRouter();
  // const pathname = usePathname()
  useEffect(() => {
    console.log('==========')
    console.log('authUser::', authAccessToken)
    console.log('==========')
    OpenAPI.TOKEN = authAccessToken;
  }, [authAccessToken]);

  return (
    <View
      flex={1}
    >
      {children}
    </View>
  );
};

export default AuthProvider;
