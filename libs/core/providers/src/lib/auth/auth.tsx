import {
  Session,
  createPagesBrowserClient
} from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Database } from '@zix/supabase';
import { AuthStateChangeHandler } from './auth-state-change-handler';

import React, { useState } from 'react';

export interface AuthProviderProps {
  initialSession?: Session | null;
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  initialSession,
  children
}) => {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      <AuthStateChangeHandler />
      {children}
    </SessionContextProvider>
  );
};

export default AuthProvider;
