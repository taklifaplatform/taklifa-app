import React, { createContext, useState } from 'react';


export interface AuthContextType {
  saudiProductsMode: boolean;
  toggleSaudiProductsMode: () => void;
}

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  saudiProductsMode: false,
  toggleSaudiProductsMode: () => { },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}) => {
  const [saudiProductsMode, setSaudiProductsMode] = useState(false);

  const toggleSaudiProductsMode = () => {
    setSaudiProductsMode(!saudiProductsMode);
  };

  return (
    <AuthContext.Provider value={{ saudiProductsMode, toggleSaudiProductsMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
