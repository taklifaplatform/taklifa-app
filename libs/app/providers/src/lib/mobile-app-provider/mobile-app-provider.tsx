import { ProvidersComposer, TamaguiProvider } from '@zix/core/providers';
import React from 'react';

export interface MobileAppProviderProps {
  children: React.ReactNode;
}

export const MobileAppProvider: React.FC<MobileAppProviderProps> = ({
  children
}) => {
  return (
    <ProvidersComposer providers={[TamaguiProvider]}>
      {children}
    </ProvidersComposer>
  );
};

export default MobileAppProvider;
