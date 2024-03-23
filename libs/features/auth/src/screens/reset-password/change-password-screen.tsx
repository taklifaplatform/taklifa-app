import { useAuth } from '@zix/services/auth';
import { t } from 'i18next';
import { AuthHeader } from '../../components/auth-header/auth-header';
import ChangePasswordForm from '../../forms/change-password-form/change-password-form';

export const ChangePasswordScreen = () => {
  const { redirectUserToActiveDashboard } = useAuth();

  return (
    <ChangePasswordForm onSuccess={user => redirectUserToActiveDashboard({ user })}>
      <AuthHeader
        showIcon={false}
        activeStep={3}
        totalSteps={3}
        title={t('auth:change_password.title')}
        description={t('auth:change_password.description')}
      />
    </ChangePasswordForm>
  );
};

export default ChangePasswordScreen;
