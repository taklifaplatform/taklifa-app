import { ProvidersComposer, TamaguiProvider } from '@zix/core/providers';
import React from 'react';

// import { coreThemeConfig } from '@zix/core/theme';
import { themeConfig } from '@zix/app/themes/mobile';
export interface MobileAppProviderProps {
  children: React.ReactNode;
}

export const MobileAppProvider: React.FC<MobileAppProviderProps> = ({
  children
}) => {
  return (
    <ProvidersComposer
      providers={[
        ({ children }) => (
          // <>{children}</>
          <TamaguiProvider config={themeConfig}>{children}</TamaguiProvider>
        )
      ]}
    >
      {children}
    </ProvidersComposer>
  );
};

export default MobileAppProvider;
