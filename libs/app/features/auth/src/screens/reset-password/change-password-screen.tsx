import { AuthHeader } from '../../components/auth-header/auth-header';
import ChangePasswordForm from '../../forms/change-password-form/change-password-form';
import { useUserRedirect } from '../../hooks/useUserRedirect';
import { t } from 'i18next';

export const ChangePasswordScreen = () => {
  const { redirectUser } = useUserRedirect();

  return (
    <ChangePasswordForm onSuccess={redirectUser}>
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
