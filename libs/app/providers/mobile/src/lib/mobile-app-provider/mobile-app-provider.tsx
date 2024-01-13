import { Session } from '@supabase/supabase-js';
import { themeConfig } from '@zix/app/themes/mobile';
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

export default MobileAppProvider;
