import { useQuery } from "@tanstack/react-query";
import { AuthenticatedUserTransformer, UserService } from "@zix/api";
import { useAtom } from "jotai";
import { authUserStorage } from "../atoms";

export const useUser = () => {
  const [authUser, setAuthUser] = useAtom(authUserStorage);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["profile", authUser?.id],
    queryFn: async () => {
      return authUser?.id
        ? UserService.retrieveUser()
        : { data: {} as AuthenticatedUserTransformer };
    },
    onSuccess(data) {
      data?.data && setAuthUser(data?.data);
    },
  });

  const user = authUser?.id
    ? {
      ...(authUser || {}),
      ...(data?.data || {}),
    }
    : null;
  // const { data: profile, refetch, isLoading: isLoadingProfile } = useProfile();

  const avatarUrl = (function () {
    if (user?.avatar_url) return user.avatar_url;

    const params = new URLSearchParams();
    const name = user?.name || user?.email || "";
    params.append("name", name);
    params.append("size", "256"); // will be resized again by NextImage/SolitoImage
    return `https://ui-avatars.com/api.jpg?${params.toString()}`;
  })();

  return {
    user,
    avatarUrl,
    updateProfile: () => refetch(),
    isLoading,
  };
};
