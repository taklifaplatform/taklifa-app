import { useAuth } from '@zix/services/auth';
import { ScreenLayout } from '@zix/ui/layouts';
import { useRouter } from 'solito/router';
import SendResetPhoneNumberForm from '../../forms/verify-phone-number-form/send-reset-phone-number-form';

export const ResetPasswordVerifyPhoneNumberScreen = () => {
  const router = useRouter();
  const { setAuthAccessToken, setAuthUser } = useAuth();

  return (
    <ScreenLayout>
      <SendResetPhoneNumberForm
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
