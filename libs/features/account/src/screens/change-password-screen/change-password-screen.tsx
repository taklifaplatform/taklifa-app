import { ChangePasswordForm } from '@zix/features/auth';
import { isWeb } from 'tamagui';

import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useRouter } from 'solito/router';


export const ChangePasswordScreen = () => {
  const router = useRouter();

  return (
    <>
      <AppHeader
        headerBackgroundColor="transparent"
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
    </>
  );
};

export default ChangePasswordScreen;
