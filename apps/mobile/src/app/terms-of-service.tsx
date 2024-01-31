import { TermsOfServiceScreen } from '@zix/app/features/auth';
import { AppHeader } from '@zix/app/ui/common';
import { t } from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  return (
    <>
      <AppHeader
        title={t('account:terms_of_service.title')}
        showBackButton
        headerBackgroundColor="transparent"
      />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <TermsOfServiceScreen />
      </SafeAreaView>
    </>
  );
}
