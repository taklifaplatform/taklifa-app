import React from 'react';
import { TamaguiProvider as TGProvider, createTamagui } from 'tamagui';

// TODO: replace with your own config
import { config } from '@tamagui/config/v2';

const tamaguiConfig = createTamagui(config);

export interface TamaguiProviderProps {
  children: React.ReactNode;
}

export const TamaguiProvider: React.FC<TamaguiProviderProps> = ({
  children
}) => {
  return <TGProvider config={tamaguiConfig}>{children}</TGProvider>;
};

export default TamaguiProvider;
