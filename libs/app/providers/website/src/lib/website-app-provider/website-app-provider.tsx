import { Session } from '@supabase/supabase-js';
import { themeConfig } from '@zix/app/themes/website';
import {
  AuthProvider,
  ProvidersComposer,
  QueryClientProvider,
  SafeAreaProvider,
  TamaguiProvider,
  ToastProvider,
  UniversalThemeProvider
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
        UniversalThemeProvider,
        SafeAreaProvider,
        ({ children }) => (
          <TamaguiProvider config={themeConfig}>{children}</TamaguiProvider>
        ),
        ToastProvider,
        ({ children }) => (
          <AuthProvider initialSession={initialSession}>
            {children}
          </AuthProvider>
        ),
        QueryClientProvider
      ]}
    >
      {children}
    </ProvidersComposer>
  );
};

export default WebsiteAppProvider;
