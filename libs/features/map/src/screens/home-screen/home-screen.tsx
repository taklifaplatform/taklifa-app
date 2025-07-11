import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';

export function HomeScreen() {
  return (
    <ScreenLayout>
      <AppHeader
        title={t('navigation:customer-dashboard.home')}
      />
    </ScreenLayout>
  );
}

export default HomeScreen;
