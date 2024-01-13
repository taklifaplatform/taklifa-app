import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';

import { ProvidersComposer, TamaguiProvider } from '@zix/core/providers';

import React from 'react';

export interface WebsiteAppProviderProps {
  children: React.ReactNode;
}

export const WebsiteAppProvider: React.FC<WebsiteAppProviderProps> = ({
  children
}) => {
  return (
    <ProvidersComposer providers={[TamaguiProvider]}>
      {children}
    </ProvidersComposer>
  );
};

export default WebsiteAppProvider;
