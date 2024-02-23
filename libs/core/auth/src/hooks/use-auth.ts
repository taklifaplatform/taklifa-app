import { useAtom } from "jotai";
import { authAccessTokenStorage, authUserStorage } from "../atoms";
import { AuthService } from "@zix/api";
import { useRouter } from "solito/router";

export function useAuth() {
  const [, setAuthAccessToken] = useAtom(authAccessTokenStorage);
  const [, setAuthUser] = useAtom(authUserStorage);
  const router = useRouter();

  function logout() {
    setAuthAccessToken("");
    setAuthUser({});

    try {
      AuthService.logout();
    } catch (error) {
      //
    }

    router.replace("/customer");
    router.push("/auth/login");
  }

  return {
    logout,
  };
}
