import { useAuth } from '@zix/utils';
import { useMemo } from 'react';

export function useRegisterStepsCounter() {
  const { user } = useAuth();

  const totalSteps = useMemo<number>(() => {
    if (user?.requested_user_type === 'service_requestor') {
      return 2;
    }
    if (user?.requested_user_type === 'company') {
      return 3;
    }
    if (user?.requested_user_type === 'individual') {
      return 4;
    }

    return 0;
  }, [user?.requested_user_type]);

  return {
    totalSteps,
    user,
  };
}
