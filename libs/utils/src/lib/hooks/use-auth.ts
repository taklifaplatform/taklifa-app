import { useQuery } from "@tanstack/react-query";

import {
  AuthenticatedUserTransformer,
  AuthService,
  UserService,
} from "@zix/api";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { useRouter } from "solito/router";
import {
  authAccessTokenStorage,
  authRequestedAccountTypeStorage,
  authUserStorage,
} from "../atoms";

export type RedirectUserOptions = {
  pushRoute?: boolean;
  user?: AuthenticatedUserTransformer;
};

export function useAuth() {
  const [authAccessToken, setAuthAccessToken] = useAtom(authAccessTokenStorage);
  const [authUser, setAuthUser] = useAtom(authUserStorage);
  const [requestedAccountType, setRequestedAccountType] = useAtom(
    authRequestedAccountTypeStorage,
  );
  const router = useRouter();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["profile", authUser?.id],
    queryFn: async () => {
      return authAccessToken?.length
        ? UserService.retrieveUser()
        : { data: {} as AuthenticatedUserTransformer };
    },
  });

  const user = useMemo<AuthenticatedUserTransformer>(() => ({
    ...(authUser || {}),
    ...(data?.data || {}),
  }), [authUser, data]);

  const isLoggedIn = useMemo(() => !!authAccessToken, [authAccessToken]);

  /**
   * The number of steps in the registration process.
   */
  const registerSteps = useMemo(() => {
    if (requestedAccountType === 'customer') {
      return 2;
    }
    if (requestedAccountType === 'company_owner') {
      return 3;
    }
    if (requestedAccountType === 'solo_driver') {
      return 4;
    }
    return 0;
  }, [requestedAccountType]);

  const avatarUrl = useMemo(() => {
    if (user?.avatar?.url) return user?.avatar?.url;
    const params = new URLSearchParams();
    const name = user?.name || user?.email || "";
    params.append("name", name);
    params.append("size", "256"); // will be resized again by NextImage/SolitoImage
    return `https://ui-avatars.com/api.jpg?${params.toString()}`;
  }, [user]);

  const redirectUserToActiveDashboard = useCallback(
    (options: RedirectUserOptions = {
      pushRoute: true,
      user: {},
    }) => {
      const redirect = options.pushRoute ? router.push : router.replace;
      const activeRoleName = options?.user?.active_role?.name ||
        user?.active_role?.name;

      if (activeRoleName === "solo_driver") {
        redirect("/solo-driver");
      } else if (
        activeRoleName &&
        ["company_owner", "company_manager", "company_driver"].includes(
          activeRoleName,
        )
      ) {
        redirect("/company");
      } else {
        redirect("/customer");
      }
    },
    [router, user],
  );

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
    user,
    refetchUser: () => refetch(),
    avatarUrl,
    isLoading,
    logout,
    authAccessToken,
    setAuthAccessToken,
    setAuthUser,
    isLoggedIn,
    redirectUserToActiveDashboard,

    requestedAccountType,
    setRequestedAccountType,
    registerSteps,
  };
}
