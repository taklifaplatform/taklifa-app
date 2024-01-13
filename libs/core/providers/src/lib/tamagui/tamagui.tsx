import React from 'react';
import { TamaguiProvider as TGProvider, TamaguiInternalConfig } from 'tamagui';

export interface TamaguiProviderProps {
  children: React.ReactNode;
  config: TamaguiInternalConfig;
}

export const TamaguiProvider: React.FC<TamaguiProviderProps> = ({
  children,
  config
}) => {
  return <TGProvider config={config}>{children}</TGProvider>;
};

export default TamaguiProvider;
