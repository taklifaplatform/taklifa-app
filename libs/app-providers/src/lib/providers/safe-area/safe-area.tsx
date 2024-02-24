import React from 'react';

export interface SafeAreaProviderProps {
  children: React.ReactNode;
}

export const SafeAreaProvider: React.FC<SafeAreaProviderProps> = ({
  children
}) => {
  return children;
};

export default SafeAreaProvider;
