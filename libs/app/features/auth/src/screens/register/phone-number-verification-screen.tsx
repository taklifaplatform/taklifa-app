import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { useRouter } from 'solito/router';

import { User } from '@supabase/supabase-js';
import { authAccountTypeAtom, authUserTypeAtom } from '../../atoms';
import VerifyPhoneNumberForm from '../../forms/verify-phone-number-form/verify-phone-number-form';

export const SignUpPhoneNumberVerificationScreen = () => {
  const router = useRouter();

  const [userType] = useAtom(authUserTypeAtom);
  const [accountType] = useAtom(authAccountTypeAtom);

  const totalSteps = useMemo(() => {
    if (accountType === 'service_requestor') {
      return 2;
    }
    if (userType === 'company') {
      return 3;
    }
    if (userType === 'individual') {
      return 4;
    }
    return 0;
  }, [userType, accountType]);

  async function onSuccess(user?: User) {
    if (user?.user_metadata.requested_user_type === 'service_requestor') {
      router.replace('/auth/register/success?redirect=/customer');
    }
    if (user?.user_metadata.requested_user_type === 'company') {
      alert('Company creation flow still under development');
      router.replace('/companies/create');
      // router.replace('/auth/create-company')
    }
    if (user?.user_metadata.requested_user_type === 'individual') {
      router.replace('/auth/verify-kyc');
    }
  }

  return (
    <VerifyPhoneNumberForm
      activeStep={2}
      totalSteps={totalSteps || 1}
      onSuccess={onSuccess}
    />
  );
};

export default SignUpPhoneNumberVerificationScreen;
