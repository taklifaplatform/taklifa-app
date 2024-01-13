import { useSupabase } from "@zix/core/supabase";
import { useEffect } from "react";
import { useRouter } from "solito/router";

const useRedirectAfterSignOut = () => {
  const supabase = useSupabase();
  const router = useRouter();
  useEffect(() => {
    const signOutListener = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        router.replace("/auth/login");
      }
    });
    return () => {
      signOutListener.data.subscription.unsubscribe();
    };
  }, [supabase, router]);
};

export const AuthStateChangeHandler = () => {
  useRedirectAfterSignOut();
  return null;
};
