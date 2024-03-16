
import React from 'react';


export type LaravelEchoProviderProps = {
  children: React.ReactNode;
}


export const LaravelEchoProvider: React.FC<LaravelEchoProviderProps> = ({
  children
}) => {
  return children;
}


export default LaravelEchoProvider;
