import React from 'react';
import { TamaguiProvider as TGProvider, TamaguiProviderProps } from 'tamagui';
import { useRootTheme } from '../universal-theme/universal-theme';

export const TamaguiProvider: React.FC<TamaguiProviderProps> = ({
  children,
  ...props
}) => {
  const [rootTheme] = useRootTheme();

  return (
    <TGProvider
      {...props}
      disableInjectCSS
      disableRootThemeClass
      defaultTheme={rootTheme}
    >
      {children}
    </TGProvider>
  );
};

export default TamaguiProvider;
