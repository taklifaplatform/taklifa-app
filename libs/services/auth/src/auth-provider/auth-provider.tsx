
import React, { useEffect } from 'react';
import { View } from 'tamagui';

import { OpenAPI } from '@zix/api';
import { useAuth } from '../hooks/use-auth';

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}) => {
  const { authAccessToken } = useAuth()

  useEffect(() => {
    OpenAPI.TOKEN = authAccessToken;
  }, [authAccessToken]);

  return (
    <View flex={1}>
      {children}
    </View>
  );
};

export default AuthProvider;
