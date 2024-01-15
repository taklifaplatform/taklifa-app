import React from 'react';

import { View, Text } from 'react-native';

/* eslint-disable-next-line */
export interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <View>
      <Text>Welcome to auth-layout!</Text>
      {children}
    </View>
  );
}

export default AuthLayout;
