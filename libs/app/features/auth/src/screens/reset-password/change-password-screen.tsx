import { AuthHeader } from '../../components/auth-header/auth-header';
import ChangePasswordForm from '../../forms/change-password-form/change-password-form';
import { useUserRedirect } from '../../hooks/useUserRedirect';

export const ChangePasswordScreen = () => {
  const { redirectUser } = useUserRedirect();

  return (
    <ChangePasswordForm onSuccess={redirectUser}>
      <AuthHeader
        showIcon={false}
        activeStep={3}
        totalSteps={3}
        title="Change Password"
        description="Enter your new password and confirm it to reset your password"
      />
    </ChangePasswordForm>
  );
};

export default ChangePasswordScreen;
