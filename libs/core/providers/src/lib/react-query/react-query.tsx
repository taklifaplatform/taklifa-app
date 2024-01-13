import React from 'react';

export interface QueryClientProviderProps {
  children: React.ReactNode;
}

export const QueryClientProvider: React.FC<QueryClientProviderProps> = ({ children }) => {
  return children;
};

export default QueryClientProvider;
