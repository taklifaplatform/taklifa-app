import React from 'react';
import { TamaguiProvider as TGProvider, TamaguiProviderProps } from 'tamagui';

export const TamaguiProvider: React.FC<TamaguiProviderProps> = ({
  children,
  ...props
}) => {
  return <TGProvider {...props}>{children}</TGProvider>;
};

export default TamaguiProvider;
