import { Session } from '@supabase/auth-helpers-react';
import { AuthError } from '@supabase/supabase-js';
import { SessionContext, supabase } from '@zix/core/supabase';
import { useEffect, useState } from 'react';
import { AuthProviderProps } from './auth';
import { AuthStateChangeHandler } from './auth-state-change-handler';
import { OpenAPI } from '@zix/api';

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialSession
}) => {
  const [session, setSession] = useState<Session | null>(
    initialSession || null
  );
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    OpenAPI.BASE = `${process.env.LARAVEL_API_URL}`;
    setIsLoading(true);
    supabase.auth
      .getSession()
      .then(({ data: { session: newSession } }) => {
        OpenAPI.TOKEN = newSession?.access_token;
        setSession(newSession);
      })
      .catch((error) => setError(new AuthError(error.message)))
      .finally(() => setIsLoading(false));
  }, []);
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider
      value={
        session
          ? {
            session,
            isLoading: false,
            error: null,
            supabaseClient: supabase
          }
          : error
            ? {
              error,
              isLoading: false,
              session: null,
              supabaseClient: supabase
            }
            : {
              error: null,
              isLoading,
              session: null,
              supabaseClient: supabase
            }
      }
    >
      <AuthStateChangeHandler />
      {children}
    </SessionContext.Provider>
  );
};

export default AuthProvider;
