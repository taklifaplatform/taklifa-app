import { ChangePasswordForm } from '@zix/features/auth';
import { useMixpanel } from '@zix/services/auth';
import { isWeb } from 'tamagui';

import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useRouter } from 'solito/router';


export const ChangePasswordScreen = () => {
  useMixpanel('Change Password Screen view')
  const router = useRouter();

  return (
    <ScreenLayout safeAreaBottom>
      <AppHeader
        showBackButton
        title={t('auth:change_password.title')}
      />
      <ChangePasswordForm
        onSuccess={() => {
          if (!isWeb) {
            router.back();
          }
        }}
      />
    </ScreenLayout>
  );
};

export default ChangePasswordScreen;
