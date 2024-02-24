import { CompaniesDashboardLayout } from '@zix/features/companies-dashboard';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <CompaniesDashboardLayout>
      <Stack screenOptions={{ headerShown: false }} />
    </CompaniesDashboardLayout>
  );
}
