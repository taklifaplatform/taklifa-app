import { ChangePasswordForm } from '@zix/app/features/auth';
import { isWeb } from '@zix/app/ui/core';

import { useRouter } from 'solito/router';

/* eslint-disable-next-line */
export interface ChangePasswordScreenProps {}

export const ChangePasswordScreen = () => {
  const router = useRouter();

  return (
    <ChangePasswordForm
      onSuccess={() => {
        if (!isWeb) {
          router.back();
        }
      }}
    />
  );
};

export default ChangePasswordScreen;
