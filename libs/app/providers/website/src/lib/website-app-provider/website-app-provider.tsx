import { Session } from '@supabase/supabase-js';
import { themeConfig } from '@zix/app/themes/website';
import {
  AuthProvider,
  ProvidersComposer,
  QueryClientProvider,
  SafeAreaProvider,
  TamaguiProvider,
  ToastProvider
} from '@zix/core/providers';
import { Provider as JotaiProvider } from 'jotai';

import React from 'react';
export { AuthProviderProps } from '@zix/core/providers';

export interface WebsiteAppProviderProps {
  children: React.ReactNode;
  initialSession?: Session | null;
}

export const WebsiteAppProvider: React.FC<WebsiteAppProviderProps> = ({
  children,
  initialSession
}) => {
  return (
    <ProvidersComposer
      providers={[
        JotaiProvider,
        QueryClientProvider,
        SafeAreaProvider,
        ToastProvider,
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

export default WebsiteAppProvider;
