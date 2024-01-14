import React from 'react';
import { View, Text } from '@zix/core/ui';

export type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <View>
      <Text>Auth Web Layout</Text>
      {children}
    </View>
  );
};

export default AuthLayout;
