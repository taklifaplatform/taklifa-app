import { TermsOfServiceScreen } from '@zix/features/auth';
import { AppHeader } from '@zix/ui/common';
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
