import { useMemo } from "react";
import { useUser } from "./useUser";

export function useRegisterStepsCounter() {
  const { user } = useUser();

  const totalSteps = useMemo<number>(() => {
    if (user?.user_metadata.requested_user_type === "service_requestor") {
      return 2;
    }
    if (user?.user_metadata.requested_user_type === "company") {
      return 3;
    }
    if (user?.user_metadata.requested_user_type === "individual") {
      return 4;
    }

    return 0;
  }, [user?.user_metadata.requested_user_type]);

  return {
    totalSteps,
    user,
  };
}
