import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

/* eslint-disable-next-line */
export interface AuthLayoutProps {}

export function AuthLayout(props: AuthLayoutProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}

export default AuthLayout;
