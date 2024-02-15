import { User } from "@supabase/supabase-js";
import { useCallback } from "react";
import { useRouter } from "solito/router";
import { useUser } from "@zix/core/auth";

export function useUserRedirect() {
  const { user } = useUser();
  const router = useRouter();

  const redirectUser = useCallback(
    (_user?: User) => {
      // TODO handel user redirect base on last active dashboard or what he have registered with
      console.log("redirectUser::::", JSON.stringify({ user, _user }, null, 2));
      if (!user && !_user) {
        router.push("/auth/login");
      } else {
        router.push("/customer");
      }
    },
    [router, user],
  );

  return {
    redirectUser,
  };
}
