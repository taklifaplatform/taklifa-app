import { useRouter } from 'solito/router';
import VerifyPhoneNumberForm from '../../forms/verify-phone-number-form/verify-phone-number-form';
import { useAuth } from '@zix/services/auth';
import { ScreenLayout } from '@zix/ui/layouts';

export const ResetPasswordVerifyPhoneNumberScreen = () => {
  const router = useRouter();
  const { setAuthAccessToken, setAuthUser } = useAuth();

  return (
    <ScreenLayout>
      <VerifyPhoneNumberForm
        totalSteps={3}
        activeStep={2}
        onSuccess={(data) => {
          setAuthAccessToken(data?.plainTextToken);
          setAuthUser(data?.user);
          router.push('/auth/reset-password/change');
        }}
      />
    </ScreenLayout>
  );
};

export default ResetPasswordVerifyPhoneNumberScreen;
