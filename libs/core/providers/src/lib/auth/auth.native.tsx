import { Session } from '@supabase/auth-helpers-nextjs';

import React from 'react';

import { View, Text } from 'react-native';

export interface AuthProps {
  initialSession?: Session | null;
  children?: React.ReactNode;
}

export function Auth(props: AuthProps) {
  return (
    <View>
      <Text>Welcome to auth!</Text>
    </View>
  );
}

export default Auth;
