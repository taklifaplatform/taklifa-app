
import React from 'react';

import { AuthContext } from './auth-context';
import { useAuthHelpers } from './use-auth-helpers';

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}) => {
  const authHelpers = useAuthHelpers()

  return (
    <AuthContext.Provider value={authHelpers}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
