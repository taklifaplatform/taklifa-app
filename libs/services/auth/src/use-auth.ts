import { useQuery } from '@tanstack/react-query';

import {
  AuthenticatedUserTransformer,
  DriverTransformer,
  OpenAPI,
  UserService,
} from '@zix/api';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'solito/router';
import {
  authAccessTokenStorage,
  authRequestedAccountTypeStorage,
  authUserStorage,
} from './auth-atoms';
import { AUTH_ROLE_TYPE, COMPANY_ROLES, USER_ROLES } from './types';

export type RedirectUserOptions = {
  pushRoute?: boolean;
  user?: AuthenticatedUserTransformer;
};

export interface AuthHelpers {
  activeRole: AUTH_ROLE_TYPE;
  user: AuthenticatedUserTransformer;
  refetchUser: () => void;
  avatarUrl: string;
  isLoading: boolean;
  logout: () => void;
  authAccessToken?: string;
  setAuthAccessToken: (accessToken: string) => void;
  setAuthUser: (user: AuthenticatedUserTransformer) => void;
  isLoggedIn: boolean;
  redirectUserToActiveDashboard: (options?: RedirectUserOptions) => void;
  requestedAccountType: string;
  setRequestedAccountType: (accountType: AUTH_ROLE_TYPE) => void;
  registerSteps: number;
  getUrlPrefix: string;
  isServiceProvider: (
    user: AuthenticatedUserTransformer | DriverTransformer,
  ) => boolean;
}

export function useAuth(): AuthHelpers {
  const [authAccessToken, setAuthAccessToken] = useAtom(authAccessTokenStorage);
  const [authUser, setAuthUser] = useAtom(authUserStorage);
  const [requestedAccountType, setRequestedAccountType] = useAtom(
    authRequestedAccountTypeStorage,
  );
  const router = useRouter();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['profile', authUser?.id, authAccessToken?.substring(0, 5)],
    queryFn: async () => {
      /**
       * When the app first open, the access might be still loading.
       */
      if (!authAccessToken) {
        return { data: {} as AuthenticatedUserTransformer };
      }

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

      return { data: {} as AuthenticatedUserTransformer };
    },
  });

  const user = useMemo<AuthenticatedUserTransformer>(
    () => ({
      ...(authUser || {}),
      ...(data?.data || {}),
    }),
    [authUser, data],
  );

  const activeRole = useMemo<AUTH_ROLE_TYPE>(() => {
    return (user?.active_role?.name as AUTH_ROLE_TYPE) || 'customer';
  }, [user]);

  const isLoggedIn = useMemo(
    () => !!authAccessToken && !!user?.id,
    [authAccessToken, user],
  );

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

  const getUrlPrefix = useMemo(() => {
    return '/app';
  }, []);

  const redirectUserToActiveDashboard = useCallback(
    (
      options: RedirectUserOptions = {
        pushRoute: true,
        user: {},
      },
    ) => {
      const redirect = options.pushRoute ? router.push : router.replace;

      redirect(getUrlPrefix);

      setAuthUser({
        ...user,
        ...(options.user || {}),
      });
    },
    [router.push, router.replace, getUrlPrefix, setAuthUser, user],
  );

  const isServiceProvider = (
    _user: AuthenticatedUserTransformer | DriverTransformer,
  ) => {
    return !!_user?.roles?.some(
      (role) =>
        COMPANY_ROLES.includes(role.name as AUTH_ROLE_TYPE) ||
        role.name === USER_ROLES.solo_driver,
    );
  };

  function logout() {
    setAuthAccessToken('');
    setAuthUser({});

    try {
      // AuthService.logout();
    } catch (error) {
      //
    }

    router.replace('/app');
    router.push('/auth/login');
  }

  function refetchUser() {
    refetch().then(() => {
      data?.data && setAuthUser(data.data);
    });
  }

  useEffect(() => {
    if (authAccessToken && !user?.id) {
      refetchUser();
    }
    OpenAPI.TOKEN = authAccessToken;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authAccessToken, user]);

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

    getUrlPrefix,
    isServiceProvider,
  };
}
