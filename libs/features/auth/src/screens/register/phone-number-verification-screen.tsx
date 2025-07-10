import { useRouter } from 'solito/router';

import { UserTransformer } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { ScreenLayout } from '@zix/ui/layouts';
import VerifyPhoneNumberForm from '../../forms/verify-phone-number-form/verify-phone-number-form';

export const SignUpPhoneNumberVerificationScreen = () => {
  useMixpanel('Sign Up Phone Number Verification Screen view')
  const router = useRouter();
  const { registerSteps, requestedAccountType } = useAuth();

  async function onSuccess(user?: UserTransformer) {
    if (requestedAccountType === 'company_owner') {
      router.replace('/auth/create-company');
    } else {
      router.replace('/auth/register/success');
    }
  }

  return (
    <ScreenLayout safeAreaBottom>
      <VerifyPhoneNumberForm
        activeStep={2}
        totalSteps={registerSteps || 1}
        onSuccess={onSuccess}
      />
    </ScreenLayout>
  );
};

export default SignUpPhoneNumberVerificationScreen;
