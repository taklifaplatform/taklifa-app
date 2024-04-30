import { ChangePasswordForm } from '@zix/features/auth';
import { isWeb } from 'tamagui';

import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useRouter } from 'solito/router';


export const ChangePasswordScreen = () => {
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
