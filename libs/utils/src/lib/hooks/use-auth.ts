import { useQuery } from "@tanstack/react-query";

import {
  AuthenticatedUserTransformer,
  AuthService,
  UserService,
} from "@zix/api";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { useRouter } from "solito/router";
import { authAccessTokenStorage, authUserStorage } from "../atoms";

export function useAuth() {
  const [authAccessToken, setAuthAccessToken] = useAtom(authAccessTokenStorage);
  const [authUser, setAuthUser] = useAtom(authUserStorage);
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

  const avatarUrl = useMemo(() => {
    if (user?.avatar?.url) return user?.avatar?.url;
    const params = new URLSearchParams();
    const name = user?.name || user?.email || "";
    params.append("name", name);
    params.append("size", "256"); // will be resized again by NextImage/SolitoImage
    return `https://ui-avatars.com/api.jpg?${params.toString()}`;
  }, [user]);

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
  };
}
