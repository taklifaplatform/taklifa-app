import { useRouter } from 'solito/router';

import { UserTransformer } from '@zix/api';
import { useAuth } from '@zix/utils';
import VerifyPhoneNumberForm from '../../forms/verify-phone-number-form/verify-phone-number-form';

export const SignUpPhoneNumberVerificationScreen = () => {
  const router = useRouter();
  const { registerSteps, requestedAccountType, } = useAuth()

  async function onSuccess(user?: UserTransformer) {
    if (requestedAccountType === 'customer') {
      router.replace('/auth/register/success');
    }
    if (requestedAccountType === 'company_owner') {
      router.replace('/auth/create-company');
    }
    if (requestedAccountType === 'solo_driver') {
      router.replace('/auth/verify-kyc');
    }
  }

  return (
    <VerifyPhoneNumberForm
      activeStep={2}
      totalSteps={registerSteps || 1}
      onSuccess={onSuccess}
    />
  );
};

export default SignUpPhoneNumberVerificationScreen;
