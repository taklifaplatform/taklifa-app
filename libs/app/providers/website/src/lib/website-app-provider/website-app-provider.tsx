// import '@tamagui/core/reset.css';
// import '@tamagui/font-inter/css/400.css';
// import '@tamagui/font-inter/css/700.css';

import { themeConfig } from '@zix/app/themes/website';
import { ProvidersComposer, TamaguiProvider } from '@zix/core/providers';

import React from 'react';

export interface WebsiteAppProviderProps {
  children: React.ReactNode;
}

export const WebsiteAppProvider: React.FC<WebsiteAppProviderProps> = ({
  children
}) => {
  return (
    <ProvidersComposer
      providers={[
        ({ children }) => (
          <TamaguiProvider config={themeConfig}>{children}</TamaguiProvider>
        )
      ]}
    >
      {children}
    </ProvidersComposer>
  );
};

export default WebsiteAppProvider;
