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
