import React, { createContext, useState } from 'react';


export interface AuthContextType {
  urgencyMode: boolean;
  toggleUrgencyMode: () => void;
}

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  urgencyMode: false,
  toggleUrgencyMode: () => { },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}) => {
  const [urgencyMode, setUrgencyMode] = useState(false);

  const toggleUrgencyMode = () => {
    setUrgencyMode(!urgencyMode);
  };

  return (
    <AuthContext.Provider value={{ urgencyMode, toggleUrgencyMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
