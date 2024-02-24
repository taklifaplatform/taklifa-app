import { useRouter } from 'solito/router';
import VerifyPhoneNumberForm from '../../forms/verify-phone-number-form/verify-phone-number-form';

export const ResetPasswordVerifyPhoneNumberScreen = () => {
  const router = useRouter();

  return (
    <VerifyPhoneNumberForm
      totalSteps={3}
      activeStep={2}
      onSuccess={() => {
        router.push('/auth/reset-password/change');
      }}
    />
  );
};

export default ResetPasswordVerifyPhoneNumberScreen;
