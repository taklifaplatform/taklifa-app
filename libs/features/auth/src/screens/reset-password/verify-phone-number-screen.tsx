import { useRouter } from 'solito/router';
import VerifyPhoneNumberForm from '../../forms/verify-phone-number-form/verify-phone-number-form';
import { useAuth } from '@zix/services/auth';

export const ResetPasswordVerifyPhoneNumberScreen = () => {
  const router = useRouter();
  const { setAuthAccessToken, setAuthUser } = useAuth();

  return (
    <VerifyPhoneNumberForm
      totalSteps={3}
      activeStep={2}
      onSuccess={(data) => {
        setAuthAccessToken(data?.plainTextToken);
        setAuthUser(data?.user);
        router.push('/auth/reset-password/change');
      }}
    />
  );
};

export default ResetPasswordVerifyPhoneNumberScreen;
