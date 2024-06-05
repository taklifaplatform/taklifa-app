
import React from 'react';
import { echo } from '../echo';
import { LaravelEchoContext } from '../laravel-echo.context';

export type LaravelEchoProviderProps = {
  children: React.ReactNode;
}

export const LaravelEchoProvider: React.FC<LaravelEchoProviderProps> = ({
  children
}) => {
  return (
    <LaravelEchoContext.Provider value={echo}>
      {children}
    </LaravelEchoContext.Provider>
  );
}


export default LaravelEchoProvider;
