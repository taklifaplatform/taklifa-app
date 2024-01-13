import { AuthLayout } from '@zix/app/features/auth';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <AuthLayout>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthLayout>
  );
}
