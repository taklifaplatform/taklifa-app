import { PrivacyPolicyScreen } from '@zix/features/auth';
import { AppHeader } from '@zix/ui/common';
import { t } from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  return (
    <>
      <AppHeader
        title={t('account:privacy_policy.title')}
        showBackButton
        headerBackgroundColor="transparent"
      />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <PrivacyPolicyScreen />
      </SafeAreaView>
    </>
  );
}
