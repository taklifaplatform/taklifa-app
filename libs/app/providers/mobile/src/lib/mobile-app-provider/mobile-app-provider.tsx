import {
  AuthProvider,
  ProvidersComposer,
  QueryClientProvider,
  TamaguiProvider
} from '@zix/core/providers';
import React from 'react';

import { themeConfig } from '@zix/app/themes/mobile';
import { Session } from '@supabase/supabase-js';
export interface MobileAppProviderProps {
  children: React.ReactNode;
  initialSession?: Session | null;
}

export const MobileAppProvider: React.FC<MobileAppProviderProps> = ({
  children,
  initialSession
}) => {
  return (
    <ProvidersComposer
      providers={[
        QueryClientProvider,
        ({ children }) => (
          <AuthProvider initialSession={initialSession}>
            {children}
          </AuthProvider>
        ),
        ({ children }) => (
          <TamaguiProvider config={themeConfig}>{children}</TamaguiProvider>
        )
      ]}
    >
      {children}
    </ProvidersComposer>
  );
};

export default MobileAppProvider;
