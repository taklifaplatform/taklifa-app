import { useQuery } from '@tanstack/react-query';

import {
  AuthenticatedUserTransformer,
  AuthService,
  OpenAPI,
  UserService,
} from '@zix/api';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'solito/router';
import {
  authAccessTokenStorage,
  authRequestedAccountTypeStorage,
  authUserStorage,
} from './auth-atoms';

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
    queryKey: ['profile', authUser?.id],
    queryFn: async () => {
      if (!authAccessToken) return { data: {} as AuthenticatedUserTransformer };

      OpenAPI.TOKEN = authAccessToken;

      try {
        const data = await UserService.retrieveUser();
        return data;
      } catch (error: any) {
        if (error?.status === 401) {
          setAuthAccessToken('');
          setAuthUser({});
        }
        console.log('=============');
        console.log('error::', JSON.stringify(error, null, 2));
        console.log('=============');
      }

      return;
    },
  });

  const user = useMemo<AuthenticatedUserTransformer>(
    () => ({
      ...(authUser || {}),
      ...(data?.data || {}),
    }),
    [authUser, data],
  );

  const activeRole = useMemo<
    | 'customer'
    | 'company_owner'
    | 'company_manager'
    | 'company_driver'
    | 'solo_driver'
  >(() => {
    return user?.active_role?.name || 'customer';
  }, [user]);

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
    const name = user?.name || user?.email || '';
    params.append('name', name);
    params.append('size', '256'); // will be resized again by NextImage/SolitoImage
    return `https://ui-avatars.com/api.jpg?${params.toString()}`;
  }, [user]);

  function getRoleUrlPrefix(role: string) {
    if (role === 'solo_driver') {
      return '/solo-driver';
    }

    if (['company_owner', 'company_manager', 'company_driver'].includes(role)) {
      return '/company';
    }

    return '/customer';
  }

  const redirectUserToActiveDashboard = useCallback(
    (
      options: RedirectUserOptions = {
        pushRoute: true,
        user: {},
      },
    ) => {
      if (options?.user?.id) {
        setAuthUser(options.user);
      }

      const redirect = options.pushRoute ? router.push : router.replace;
      const activeRoleName =
        options?.user?.active_role?.name || user?.active_role?.name;

      redirect(getRoleUrlPrefix(activeRoleName as string));
    },
    [router, user],
  );

  function logout() {
    setAuthAccessToken('');
    setAuthUser({});

    try {
      AuthService.logout();
    } catch (error) {
      //
    }

    router.replace('/customer');
    router.push('/auth/login');
  }

  function refetchUser() {
    refetch().then(() => {
      data?.data && setAuthUser(data.data);
    });
  }

  return {
    activeRole,
    user,
    refetchUser,
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

    getRoleUrlPrefix,
  };
}
